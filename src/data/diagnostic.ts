export const diagnosticTest = {
    title: "IELTS Diagnostic Mini-Test",
    duration: 15,
    sections: [
        {
            type: "reading",
            passage: `
        <h2 className="text-2xl font-bold mb-4">The Impact of Artificial Intelligence on Modern Education</h2>
        <p className="mb-4">Artificial Intelligence (AI) is no longer a futuristic concept; it is actively reshaping the landscape of modern education. From personalized learning algorithms to automated grading systems, AI tools are being integrated into classrooms worldwide. Proponents argue that AI can tailor educational experiences to individual student needs, allowing for a more efficient and inclusive learning environment.</p>
        <p className="mb-4">One of the most significant benefits of AI in education is its ability to provide immediate feedback. In traditional settings, students often wait days or even weeks to receive grades on assignments. With AI-powered platforms, learners can see their mistakes in real-time and understand where they need to improve. This instant cycle of assessment can significantly accelerate the learning process.</p>
        <p className="mb-4">However, critics raise concerns about the potential loss of human interaction and the ethical implications of data privacy. They worry that over-reliance on machines might diminish the role of teachers and lead to a more standardized, less creative educational experience. Furthermore, the digital divide remains a significant barrier, as students in underprivileged areas may not have access to these advanced technologies.</p>
      `,
            questions: [
                {
                    id: 1,
                    type: "tfng",
                    question: "AI is only used in futuristic educational concepts.",
                    options: ["True", "False", "Not Given"],
                    answer: "False",
                    explanation: "The text states AI is 'actively reshaping the landscape of modern education' and is 'no longer a futuristic concept'."
                },
                {
                    id: 2,
                    type: "tfng",
                    question: "AI can help make learning more inclusive.",
                    options: ["True", "False", "Not Given"],
                    answer: "True",
                    explanation: "The text mentions proponents argue AI can allow for a 'more efficient and inclusive learning environment'."
                },
                {
                    id: 3,
                    type: "tfng",
                    question: "Immediate feedback is considered a drawback of AI by critics.",
                    options: ["True", "False", "Not Given"],
                    answer: "False",
                    explanation: "The text says immediate feedback is 'One of the most significant benefits', while critics worry about 'loss of human interaction'."
                },
                {
                    id: 4,
                    type: "multiple-choice",
                    question: "What is mentioned as a barrier to the adoption of AI in education?",
                    options: [
                        "A) Lack of student interest",
                        "B) The high cost of AI software",
                        "C) The digital divide",
                        "D) Teacher resistance"
                    ],
                    answer: "C) The digital divide",
                    explanation: "The text explicitly mentions 'the digital divide remains a significant barrier'."
                }
            ]
        }
    ]
};
