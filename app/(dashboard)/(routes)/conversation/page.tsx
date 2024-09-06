"use client";

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import {
  Form,
  FormItem,
  FormControl,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/layouts/Heading/Heading';
import { Loader } from '@/components/layouts/Loader/Loader';
import { BotAvatar } from '@/components/layouts/bot-avatar/BotAvatar';
import { UserAvatar } from '@/components/layouts/User-Avatar/user-avatar';
import { Empty } from '@/components/ui/empty';
import { formSchema } from './constant';
import { z } from 'zod';

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const recognition = useRef<any>(null);

  useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;

    recognition.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      form.setValue('prompt', transcript);
    };

    recognition.current.onerror = (event: any) => {
      toast.error('Speech recognition error: ' + event.error);
    };
  } else {
    toast.error('Speech recognition not supported in your browser.');
  }
}, []);

  const startListening = () => {
    setIsListening(true);
    recognition.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.current?.stop();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = { role: 'user', content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
      setMessages((current: any) => [...current, userMessage, response.data]);
      // Trigger text-to-speech for the bot's response
    speakResponse(response.data.content);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error('Unauthorized.');
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      router.refresh();
    }
  };

  // Function for Text-to-Speech (TTS) for chatbot responses
    const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        toast.error("Text-to-speech is not supported in your browser.");
    }
    };




  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage?.role === 'bot') {
      speak(latestMessage.content);
    }
  }, [messages]);

  return (
    <div className="m-10">
      <Heading
        title="Conversation"
        description="Our most Advanced Conversation Model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I help you?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
          <div className="flex justify-center mt-4">
            {!isListening ? (
              <Button onClick={startListening}>Start Voice Input</Button>
            ) : (
              <Button onClick={stopListening}>Stop Voice Input</Button>
            )}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && <Empty label="No conversation started." />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message: any) => (
              <div
                key={message.content}
                className={`p-8 w-full text-black flex items-start gap-x-8 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-white text-black border border-black/10'
                    : 'bg-muted'
                }`}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;