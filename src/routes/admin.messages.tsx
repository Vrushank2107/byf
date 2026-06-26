import { createFileRoute, Navigate } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MessageSquare, Mail, Phone, Clock, Check, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
  beforeLoad: () => {
    if (!checkAdminAuth()) {
      throw new Navigate({ to: "/admin" });
    }
  },
});

function AdminMessages() {
  // In a real app, this would fetch from a database
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 98765 43210",
      subject: "Volunteer Inquiry",
      message: "I would like to volunteer for the education program. Please let me know how I can contribute.",
      submittedAt: "2025-01-20T10:30:00",
      read: false,
    },
    {
      id: 2,
      name: "Sneha Patel",
      email: "sneha.patel@example.com",
      phone: "+91 87654 32109",
      subject: "Donation Question",
      message: "I want to make a donation for the blanket drive. Can you provide more details about tax benefits?",
      submittedAt: "2025-01-19T15:45:00",
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Contact Messages</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All messages read"}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No messages received yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-muted/50 transition-colors ${!message.read ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${!message.read ? "bg-primary" : "bg-muted"}`}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{message.name}</h3>
                          {!message.read && (
                            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(message.submittedAt).toLocaleString()}
                    </div>
                  </div>

                  <p className="text-sm mb-4 pl-5">{message.message}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pl-5 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${message.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {message.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${message.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {message.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-2 pl-5">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
