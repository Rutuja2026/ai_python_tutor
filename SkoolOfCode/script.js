async function sendMessage() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const userInput = document.getElementById('user-input').value.trim();
    const chatBox = document.getElementById('chat-box');

    if (!apiKey || !userInput) {
        alert("Please enter an API key and a question!");
        return;
    }

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById('user-input').value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": userInput }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.";

        // Display AI response
        chatBox.innerHTML += `<p><strong>Tutor:</strong> ${aiReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    }
}
