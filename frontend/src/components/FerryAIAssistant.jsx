import { useState } from "react";

function FerryAIAssistant() {

    const [message, setMessage] =
        useState("");

    const [reply, setReply] =
        useState("");

    // AI RESPONSE
    const handleAskAI = () => {

        const text =
            message.toLowerCase();

        // FRUITS
        if (
            text.includes("fruit")
        ) {

            setReply(

                "🍎 Nearby fruit vendors available within 2 KM."
            );
        }

        // VEGETABLES
        else if (
            text.includes("vegetable")
            ||
            text.includes("sabji")
        ) {

            setReply(

                "🥦 Fresh vegetable vendors are active near your location."
            );
        }

        // CHAI
        else if (
            text.includes("chai")
            ||
            text.includes("tea")
        ) {

            setReply(

                "☕ Top chai vendors are currently online nearby."
            );
        }

        // SNACKS
        else if (
            text.includes("snack")
        ) {

            setReply(

                "🍟 Street snack vendors are trending in your area."
            );
        }

        // DEFAULT
        else {

            setReply(

                "🤖 Sorry, I could not understand. Try asking about fruits, vegetables, chai, or snacks."
            );
        }
    };

    return (

        <div className="ferry-ai-box">

            <h2>
                🤖 FerryWala AI Assistant
            </h2>

            <input
                type="text"

                placeholder="Ask Ferry AI..."

                value={message}

                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
            />

            <button
                onClick={handleAskAI}
            >

                Ask AI

            </button>

            {
                reply && (

                    <div className="ai-reply">

                        <p>
                            {reply}
                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default FerryAIAssistant;