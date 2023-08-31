import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import assistance from "../../../../static/assistance.svg";

type Props = {
    isUser?: boolean;
    children?: string;
    empty?: React.ReactNode;
};

export default function Bubble({ isUser, children, empty }: Props) {
    const style = isUser
        ? " rounded-tr-[0px] bg-[#E9EBED] "
        : " rounded-tl-[0px] bg-white ";
    return (
        <section
            className={`flex gap-2 ${
                isUser ? " justify-end origin-top-right " : "origin-top-left "
            } bubble-animation `}
        >
            {!isUser && (
                <img
                    className="rounded-full w-6 h-6 bg-white"
                    src={assistance}
                    alt="Assistance"
                />
            )}
            <div className={"rounded-2xl p-4 max-w-[250px]" + style}>
                {empty ? (
                    empty
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="[&_*]:mb-[6px] [&_*:last-child]:mb-0 [&_*]:text-caption "
                        components={{
                            table({ children }) {
                                return (
                                    <section className="overflow-x-auto whitespace-nowrap [&_thead]:bg-[#f0f0f0]">
                                        <table>{children}</table>
                                    </section>
                                );
                            },
                        }}
                    >
                        {children ?? ""}
                    </ReactMarkdown>
                )}
            </div>
            {/* TODO add avatar*/}
            {isUser && <img className="rounded-full w-6 h-6 bg-white" />}
        </section>
    );
}
