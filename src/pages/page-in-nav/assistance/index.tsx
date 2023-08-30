import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Header, Icon } from "zmp-ui";
import { Button, message } from "antd";

import EmptyScreen from "./empty-screen";
import Bubble from "./components/bubble";
import Lottie from "lottie-react";
import bubbleLoading from "../../../static/lottie/bubble-loading.json";
import { CreateMessage } from "ai";

export default function Assistance() {
    const [messages, setMessages] = useState<CreateMessage[]>([]);
    const [input, setInput] = useState<string>("");

    const onSend = async (e: FormEvent) => {
        e.preventDefault();
        setInput("");
        if (
            (messages.length && messages[messages.length - 1].role == "user") ||
            !input
        )
            return;

        const newMessages = [...messages];
        newMessages.push({ role: "user", content: input });
        setMessages(newMessages);

        console.log(newMessages);

        const response = await fetch(
            "https://api.auradental.vn/api/v1/chatbot/admin",
            {
                method: "POST",
                body: JSON.stringify(newMessages),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();
        console.log(data);
        setMessages((prev) => {
            const newMessages = [...prev];
            newMessages.push(data);
            return newMessages;
        });
    };

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        (messagesEndRef.current as any)?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => scrollToBottom(), [messages]);

    const [hasLoadingBubble, setHasLoadingBubble] = useState(false);
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        setHasLoadingBubble(false);
        if (
            messages.length > 0 &&
            messages[messages.length - 1].role == "user"
        ) {
            timer = setTimeout(() => {
                setHasLoadingBubble(true);
            }, 3000);
        }

        return () => {
            clearTimeout(timer); // Clear the timeout if the component is unmounted
        };
    }, [messages]);
    return (
        <main className="h-full flex-col flex ">
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={false}
                title="Thư ký"
            />
            <div className="flex-1 basis-auto overflow-y-auto p-4 flex flex-col gap-4">
                {messages.length ? (
                    <>
                        {messages.map((message, i) => (
                            <Bubble isUser={message.role == "user"} key={i}>
                                {message.content}
                            </Bubble>
                        ))}
                        {hasLoadingBubble && (
                            <Bubble
                                empty={
                                    <Lottie
                                        animationData={bubbleLoading}
                                        loop={true}
                                        className="w-7 h-4"
                                    />
                                }
                            />
                        )}
                        <div ref={messagesEndRef} />
                    </>
                ) : (
                    <EmptyScreen setInput={setInput} />
                )}
                {/* {isLoading && (
              <button
                  className="inline-flex py-2 px-4 my-4 mx-auto bg-white p-2 rounded-lg gap-2 border border-solid border-[#36383A] items-center text-caption font-semibold"
                  onClick={() => stop()}
              >
                  <Icon icon="zi-close-circle" />
                  Dừng câu trả lời
              </button>
          )} */}
            </div>
            <form className="flex bg-white" onSubmit={onSend}>
                {/* TODO handle multi line */}
                <input
                    name="message"
                    value={input}
                    className="flex-1 p-4 word-wrap text-caption"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập thông tin cần được giải đáp"
                />
                <Button
                    className="mx-4"
                    icon={
                        <Icon icon="zi-send-solid" className="text-[#8F9499]" />
                    }
                    htmlType="submit"
                />
            </form>
        </main>
    );
}
