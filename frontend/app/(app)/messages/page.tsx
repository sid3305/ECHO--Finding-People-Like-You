"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, MessageCircle } from "lucide-react"
import { mockUsers } from "@/lib/echo-data"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge } from "@/components/identity-badges"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: string
}

const mockConversations: Record<
  string,
  { messages: Message[]; user: (typeof mockUsers)[0] }
> = {
  user1: {
    user: mockUsers[0],
    messages: [
      {
        id: "1",
        text: "Hey! Love your profile 🌟",
        sender: "other",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        text: "Thanks! Your interests sound amazing",
        sender: "user",
        timestamp: "10:32 AM",
      },
      {
        id: "3",
        text: "Photography enthusiast here too! Have you been to any cool locations lately?",
        sender: "other",
        timestamp: "10:35 AM",
      },
      {
        id: "4",
        text: "Yes! Just got back from Iceland. The landscapes are unreal",
        sender: "user",
        timestamp: "10:37 AM",
      },
    ],
  },
  user2: {
    user: mockUsers[1],
    messages: [
      {
        id: "1",
        text: "Hi there! 👋",
        sender: "other",
        timestamp: "Yesterday",
      },
      {
        id: "2",
        text: "Hey! How's it going?",
        sender: "user",
        timestamp: "Yesterday",
      },
    ],
  },
  user3: {
    user: mockUsers[2],
    messages: [
      {
        id: "1",
        text: "Would love to chat!",
        sender: "other",
        timestamp: "2 days ago",
      },
    ],
  },
}

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")

  const conversation = selectedUserId ? mockConversations[selectedUserId] : null
  const otherUser = conversation?.user

  const handleSend = () => {
    if (!inputValue.trim()) return
    // In a real app, this would send the message to the backend
    setInputValue("")
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Conversations List */}
      <div className="hidden w-80 flex-col border-r border-border bg-card/30 sm:flex">
        <div className="border-b border-border p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Messages
          </p>
          <h2 className="font-serif text-2xl font-light text-foreground">
            Conversations
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(mockConversations).map(([key, conv]) => (
            <button
              key={key}
              onClick={() => setSelectedUserId(key)}
              className={cn(
                "w-full border-b border-border/50 p-4 text-left transition-colors hover:bg-secondary/30",
                selectedUserId === key && "bg-secondary/50 border-b border-primary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <CosmicAvatar
                  hue={conv.user.hue}
                  name={conv.user.username}
                  size="md"
                  online={conv.user.online}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {conv.user.username}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {conv.messages[conv.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {conversation ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-border bg-card/30 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CosmicAvatar
                    hue={otherUser?.hue|| 0}
                    name={otherUser?.username|| "User"}
                    size="md"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-light text-foreground">
                      {otherUser?.username|| "User"}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5">
                      {otherUser?.mbti && <MbtiBadge type={otherUser.mbti} />}
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {otherUser?.online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex", msg.sender === "user" && "justify-end")}
                >
                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-4 py-2",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-foreground rounded-bl-none"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        msg.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card/30 p-6 backdrop-blur">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="rounded-lg bg-primary px-4 py-2.5 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
