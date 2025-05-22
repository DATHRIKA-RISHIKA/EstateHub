
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    details: ["863 975 4549"],
    action: "Call Us"
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    details: ["sngarre@gmail.com"],
    action: "Email Us"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Office",
    details: ["Saveetha University", "Chennai, Tamil Nadu"],
    action: "Get Directions"
  }
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!");
      form.reset();
    }, 1500);
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about renting, listing a property, or need assistance? 
              We're here to help you with your real estate needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            {contactInfo.map((item, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 border shadow-sm flex flex-col items-center text-center"
              >
                <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <div className="space-y-1 mb-4">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground">{detail}</p>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-auto">
                  {item.action}
                </Button>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card rounded-lg p-8 border shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..."
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-muted rounded-lg overflow-hidden shadow-sm border h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-medium mb-2">Our Location</h3>
                <p className="text-muted-foreground mb-4">
                  100 Tech Park, Bangalore, Karnataka 560001
                </p>
                <Button>View on Google Maps</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
