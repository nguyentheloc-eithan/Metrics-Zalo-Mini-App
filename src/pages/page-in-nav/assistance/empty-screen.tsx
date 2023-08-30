import { UseChatHelpers } from "ai/react";
import React from "react";
import Bubble from "./components/bubble";

const exampleMessages = [
    {
        heading: "1. Doanh thu theo cơ sở",
        message: "Doanh thu theo cơ sở",
    },
    {
        heading: "2. Tổng số order mới.",
        message: "Tổng số order mới",
    },
    {
        heading: "3. Doanh thu tháng vừa rồi",
        message: "Doanh thu tháng vừa rồi",
    },
];

export default function EmptyScreen({
    setInput,
}: Pick<UseChatHelpers, "setInput">) {
    return (
        <Bubble
            empty={
                <>
                    <p className="text-caption">
                        Aura có thể giúp gì cho Sếp hôm nay? Dưới đây là câu hỏi
                        mà các Sếp hay hỏi em:
                    </p>
                    {exampleMessages.map((item, i: number) => (
                        <div key={i}>
                            <div className="bg-[#E9EBED] h-[1px] my-2"></div>
                            <p
                                onClick={() => setInput(item.message)}
                                className="text-caption"
                            >
                                <b>{item.heading}</b>
                            </p>
                        </div>
                    ))}
                </>
            }
        >
            ""
        </Bubble>
    );
}
