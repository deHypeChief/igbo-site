import '../../assets/styles/lesson.css'
import { ClientLayout } from "../../components/layout/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, postUser, postUserData, userSigned } from "../../utilis/authManger";
import { Button } from "../../components/button/button";


import lessonHuman1 from '../../assets/images/a_cartoon_Igbo__f22b054e-e1b7-4124-bc0b-6e0c09990fdf-removebg-preview.png'
import lessonHuman2 from '../../assets/images/a_happy_little__596c32f0-ff9d-445b-8399-011f4cf18db3-removebg-preview.png';

export default function Lesson() {
    const [lessonData, setLessonData] = useState({
        level: "loading lessons",
        title: "--",
        note: "--"
    })
    const [noteData, setNoteData] = useState([])
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState(null)
    const [data, setData] = useState()
    const [sivedContent, setSivedContent] = useState([])
    const [modifiedContent, setModifiedContent] = useState([])

    let name = JSON.parse(localStorage.getItem("user")).name.split(" ")[0]
    let obj

    let modifiedList = [
        {
            "level": 1,
            "content": [
                [
                    { "type": "h1", "content": `Hello, ${name} 😀` },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "I am here to take your learning to new heights. 🚀" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Let's get started with some fundamentals, shall we? 📚" }
                ],
                [
                    { "type": "h1", "content": "Let's start with the Igbo alphabets 🅰️" },
                    ...sivedContent.slice(1, 5),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Can you say the Igbo letters one more time? 🗣️" }
                ],
                [
                    { "type": "h1", "content": "Hmmm... 🤔" },
                    { "type": "h2", "content": "I hope you can now recite the alphabets by heart..." },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "If so, let's talk about vowels. 🆚" }
                ],
                [
                    ...sivedContent.slice(5, 8),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Ok, going further... 🏃‍♂️" }
                ],
                [
                    ...sivedContent.slice(8, 15)
                ],
                [
                    { "type": "h1", "content": "Wow... 😲" },
                    { "type": "h2", "content": "Is the first letter of your Igbo name a vowel?" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "It might not be, hmmm... Let's talk about Mgbochiume next. 📖" }
                ],
                [
                    { "type": "h1", "content": "And now, Mgbochiume... 🎬" },
                    ...sivedContent.slice(16, 19),
                    { "type": "h2", "content": "Now time for some examples. 📝" }
                ],
                [
                    { "type": "h1", "content": "Examples 📝" },
                    ...sivedContent.slice(20, 34)
                ],
                [
                    { "type": "h1", "content": "I really learned a lot! 🤩" },
                    { "type": "h2", "content": "My head feels so biggg...." },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "But what is head in Igbo?" },
                    { "type": "h2", "content": "Hmmm..., let's find out, shall we? 🔍" }
                ],
                [
                    { "type": "h1", "content": "Our Body Parts in Igbo 🏃‍♂️" },
                    { "type": "h2", "content": "Akụkụ ahụ mmadu" },
                    { "type": "h4", "content": "" },
                    ...sivedContent.slice(36, 51)
                ],
                [
                    { "type": "h1", "content": "I know it now... Yeah! 🎉" },
                    { "type": "h2", "content": "Head in Igbo is ISI" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Do you know what stomach means in Igbo?" },
                    { "type": "h2", "content": "Let's get some questions to test your big brain... 💡" }
                ],
                [
                    { "type": "h1", "content": "It's Question Time... ❓" },
                    { "type": "h4", "content": "" },
                    ...sivedContent.slice(52, 54)
                ]
            ]
        },
        {
            "level": 2,
            "content": [
                [
                    { "type": "h1", "content": `${name}, welcome to Numbers! 🎉` },
                    { "type": "h2", "content": "Let's get started. 🚀" }
                ],
                [
                    { "type": "h2", "content": "Starting with numbers from 1 to 30. 🔢" },
                    ...sivedContent.slice(1, 31)
                ],
                [
                    { "type": "h1", "content": "That was quite long... 😅" },
                    { "type": "h2", "content": "Now let's go from 40 to 300. 💯" }
                ],
                [
                    { "type": "h2", "content": "More Numbers... 🔢" },
                    ...sivedContent.slice(31, 51)
                ],
                [
                    { "type": "h1", "content": "That was another long list... 😅" },
                    { "type": "h2", "content": "Now let's go from 300 to 2000. 💯" }
                ],
                [
                    { "type": "h2", "content": "More Numbers... 🔢" },
                    ...sivedContent.slice(52, 60),
                    { "type": "h2", "content": "And that is a wrap... 🎬" }
                ],
                [
                    { "type": "h1", "content": "Ahhh, Finally... 😌" },
                    { "type": "h2", "content": "Those numbers were quite large. 🤯" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Let's talk about something new. 💡" },
                    { "type": "h2", "content": "How to say 'Great' in Igbo?" }
                ],
                [
                    { "type": "h1", "content": "Greetings in Igbo 🌟" },
                    { "type": "h2", "content": "Ekele di iche iche - Different greetings. 🌞" },
                    { "type": "h4", "content": "" },
                    ...sivedContent.slice(61, 71),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Hmmm... 🤔" }
                ],
                [
                    { "type": "h1", "content": "I learned something new... 📚" },
                    { "type": "h2", "content": "Did you know 'Thank you' means Dalụ? 🙏" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "What did you learn? 🤔" }
                ],
                [
                    { "type": "h2", "content": "Next Questioning Phrases... ❓" },
                    { "type": "h2", "content": "Let's start with the basics... 🏁" },
                    ...sivedContent.slice(72, 78),
                    { "type": "h2", "content": "Going further... 🚀" }
                ],
                [
                    { "type": "h2", "content": "Next Questioning Phrases... ❓" },
                    ...sivedContent.slice(72, 78),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Going further... 🚀" }
                ],
                [
                    { "type": "h1", "content": "Some examples using questioning phrases... 📝" },
                    ...sivedContent.slice(79, 85)
                ],
                [
                    { "type": "h1", "content": "Wow... 😲" },
                    { "type": "h2", "content": "Now I can flex my Igbo skills on my friends. 💪" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Onye ka ị bụ? 🤔" },
                    { "type": "h2", "content": "Let's take some questions... ❓" }
                ],
                [
                    { "type": "h1", "content": "Question Time... ❓" },
                    ...sivedContent.slice(86, 95),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "..." }
                ]
            ]
        },
        {
            "level": 3,
            "content": [
                [
                    { "type": "h1", "content": `Welcome to Noun World, ${name}!` },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Let's dive into the fascinating world of Igbo nouns." },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Are you ready to explore different names for things?" }
                ],
                [
                    { "type": "h1", "content": "Let's Start with Animals 🦁" },
                    ...sivedContent.slice(2, 15),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Can you roar like a lion?" }
                ],
                [
                    { "type": "h1", "content": "Now, Household Items 🏠" },
                    ...sivedContent.slice(17, 29),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Imagine setting the table for dinner with these items!" }
                ],
                [
                    { "type": "h1", "content": "Exploring Different Places 🗺️" },
                    ...sivedContent.slice(31, 41),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Which place would you like to visit first?" }
                ],
                [
                    { "type": "h1", "content": "Let's Talk about Food Items 🍲" },
                    ...sivedContent.slice(42, 57),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "What's your favorite food on this list?" }
                ],
                [
                    { "type": "h1", "content": "Forming Sentences with Nouns 📝" },
                    ...sivedContent.slice(61, 67),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Can you create a sentence using any of these nouns?" }
                ],
                [
                    { "type": "h1", "content": "Questioning Phrases ❓" },
                    ...sivedContent.slice(69, 74),
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Practice asking and answering questions with these phrases!" }
                ],
                [
                    { "type": "h1", "content": "Let's Test Your Igbo Skills 🧠" },
                    { "type": "h4", "content": "" },
                    ...sivedContent.slice(76, 83),
                    { "type": "h2", "content": "Can you translate these sentences and numbers into Igbo?" }
                ],
                [
                    { "type": "h1", "content": "Great Job Learning Nouns! 🌟" },
                    { "type": "h2", "content": "You're becoming an Igbo expert!" },
                    { "type": "h4", "content": "" },
                    { "type": "h2", "content": "Keep up the fantastic work!" }
                ]
            ]
        },
        {
            level: 4,
            content: [
                [
                    { type: "h1", content: `🎉 Welcome to the World of Pronouns, ${name}! 🌟` },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Get ready to explore singular and plural pronouns!" },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's dive in and learn together! 🚀" }
                ],
                [
                    { type: "h1", content: "Singular Pronouns" },
                    ...sivedContent.slice(2, 5),
                    // ...sivedContent.slice(5, 6),
                    
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(6, 9),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Can you create a sentence using any of these pronouns? 🤔" }
                ],
                [
                    ...sivedContent.slice(9, 11),
                    // ...sivedContent.slice(5, 6),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(12, 18),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Going futher" }
                ],
                [
                    ...sivedContent.slice(18, 20),
                    // ...sivedContent.slice(5, 6),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(21, 25),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Ohh i see..." }
                ],
                [
                    { type: "h1", content: "Plural Pronouns" },
                    ...sivedContent.slice(26, 27),
                    // ...sivedContent.slice(5, 6),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(28, 37),
                    { type: "h4", content: "" },
                    { type: "h2", content: "So that how they use plural pronouns." }
                ],
                [
                    ...sivedContent.slice(36, 37),
                    // ...sivedContent.slice(5, 6),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(38, 42),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Can you create a sentence using any of these pronouns? 🤔" }
                ],
                [
                    { type: "h1", content: "Simple Sentences with Pronouns" },
                    ...sivedContent.slice(43, 55),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Practice making sentences with these pronouns! 📝" }
                ],
                [
                    { type: "h1", content: "Replacing Nouns with Pronouns" },
                    ...sivedContent.slice(55, 61),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Can you replace the nouns with the correct pronouns? 🔄" }
                ],
                [
                    { type: "h1", content: "Test Your Igbo Knowledge" },
                    { type: "h4", content: "" },
                    ...sivedContent.slice(63, 68),
                    { type: "h2", content: "Translate these words and phrases into Igbo! 📚🇳🇬" }
                ],
                [
                    { type: "h1", content: "Well Done Learning Pronouns!" },
                    { type: "h2", content: "You're mastering Igbo pronouns like a pro! 🌟👏" },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Keep up the great work! 🎉" }
                ]
            ]
        },
        {
            level: 5,
            content: [
                [
                    { type: "h1", content: '🌟 Explore Adjectives in Igbo! 🎨' },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's learn some descriptive words!" },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Are you ready to dive in? Let's go! 🚀" }
                ],
                [
                    { type: "h1", content: "Adjectives and Example Sentences" },
                    ...sivedContent.slice(1, 6),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Examples" },
                    ...sivedContent.slice(7, 20),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Can you create your own sentences with these adjectives? 💡" }
                ],
                [
                    { type: "h1", content: "Family Members in Igbo" },
                    ...sivedContent.slice(20, 37),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Do you know all your family members in Igbo? 🤔" }
                ],
                [
                    { type: "h1", content: "Test Your Igbo Skills" },
                    { type: "h4", content: "" },
                    ...sivedContent.slice(39, 44),
                    { type: "h2", content: "Translate these sentences into Igbo! 📝" }
                ],
                [
                    { type: "h1", content: "Well Done Learning Adjectives and Family Members!" },
                    { type: "h2", content: "You're expanding your Igbo vocabulary! 🌟👏" },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Keep up the great work! 🎉" }
                ]
            ]
        },
        {
            level: 6,
            content: [
                [
                    { type: "h1", content: '🌟 Learn Opposites in Igbo! 🔄' },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's discover words and their opposites!" },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Are you excited? Let's dive in! 💡" }
                ],
                [
                    { type: "h1", content: "Words and Their Opposites" },
                    ...sivedContent.slice(1, 35),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Can you create sentences with these opposites? 🤔" }
                ],
                [
                    { type: "h1", content: "Practice with Sentences" },
                    ...sivedContent.slice(36, 42),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Try replacing nouns with pronouns in these sentences! 🔄" }
                ],
                [
                    { type: "h1", content: "Well Done Learning Opposites in Igbo!" },
                    { type: "h2", content: "You're expanding your vocabulary! Keep it up! 🎉🚀" }
                ]
            ]
        },
        {
            level: 7,
            content: [
                [
                    { type: "h1", content: '📚 Verbs: Tenses and Usage 🕰️' },
                    { type: "h2", content: "Understand Present, Past, and Future Tenses!" },
                    { type: "p", content: "Every sentence usually contains a verb." },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's explore the world of verbs! 🌍" }
                ],
                [
                    { type: "h1", content: "Verbs and Their Tenses" },
                    ...sivedContent.slice(1, 2),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Example : The verbs are in []" },
                    ...sivedContent.slice(3, 7),
                    ...sivedContent.slice(8, 16),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's see verbs in action with examples! 🎬" }
                ],
                [
                    ...sivedContent.slice(17, 27),
                    { type: "h4", content: "" },
                    { type: "h2", content: "So thats how you use past tenses" }
                ],
                [
                    ...sivedContent.slice(27, 34),
                    { type: "h4", content: "" },
                    { type: "h2", content: "We are leaving the present now next Future tenses" }
                ],
                [
                    ...sivedContent.slice(34, 41),
                    { type: "h4", content: "" },
                    { type: "h2", content: "That's for future tense" }
                ],
                [
                    ...sivedContent.slice(41, 43),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Example" },
                    ...sivedContent.slice(44, 48),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Formulating Past Tense Verbs" }
                ],
                [
                    ...sivedContent.slice(49, 56),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Quick Translation Challenge!" }
                ]
            ]
        },
        {
            level: 8,
            content: [
                [
                    { type: "h1", content: '🔍 Exploring Prepositions 🔍' },
                    { type: "h2", content: "Understanding the Position of Nouns with Prepositions" },
                    { type: "p", content: "Prepositions help us understand the position of nouns." },
                    { type: "h4", content: "" },
                    { type: "h2", content: "Let's dive into examples! 💡" }
                ],
                [
                    { type: "h1", content: "Examples of Prepositions" },
                    ...sivedContent.slice(1, 2),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Example: " },
                    ...sivedContent.slice(3, 11),
                    { type: "h4", content: "" },
                    { type: "h2", content: "Example: " },
                    ...sivedContent.slice(12, 17),
                    { type: "h4", content: "" },
                    { type: "h2", content: "" }
                ],
                [
                    { type: "h1", content: "Sentence Making With Prepositions! 📚" },
                    ...sivedContent.slice(18, 19),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(19, 20),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(20, 21),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(21, 22),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(22, 23),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(23, 24),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(24, 25),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(25, 26),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(26, 27),
                    { type: "h4", content: "" },
                    ...sivedContent.slice(27, 28),
                    { type: "h4", content: "" },
                    { type: "h2", content: "" }
                ],
                [
                    { type: "h1", content: "Practice Makes Perfect! 🎯" },
                    ...sivedContent.slice(29, 40)
                ]
            ]
        },
        {
            level: 9,
            content: [
                [
                    { type: "h1", content: '🔗 Exploring Conjunctions 🔗' },
                    { type: "h2", content: "Understanding Different Conjunctions" },
                    { type: "p", content: "Conjunctions are words that connect words, phrases, or clauses." },
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "Conjunction Examples" },
                    { type: "p", content: "These a re the most used conjunctions in Igbo" },
                    { type: "h4", content: "" },
                    ...sivedContent.slice(2, 6),
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "Examples with 'Na'" },
                    ...sivedContent.slice(7, 23),
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "Examples with 'Mana'" },
                    ...sivedContent.slice(25, 34),
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "Examples with 'Maka'" },
                    ...sivedContent.slice(36, 43),
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "Quick Question" },
                    ...sivedContent.slice(45, 55)
                ]
            ]
        },
        {
            level: 10,
            content: [
                [
                    { type: "h1", content: '👥 Singular and Plural 👥' },
                    { type: "p", content: "Understanding Singular and Plural Forms in Igbo" },
                    { type: "h4", content: "" }
                ],
                [
                    { type: "h1", content: "Examples of Singular and Plural" },
                    ...sivedContent.slice(2, 7),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Additional Examples" }
                ],
                [
                    { type: "h1", content: "Yea.. some play Myiwere" },
                    { type: "h2", content: "This are words that have the same meaning but different spellings" },
                    ...sivedContent.slice(14, 21),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Quick Question" }
                ],
                [
                    { type: "h1", content: "Lets Go over some quick question" },
                    ...sivedContent.slice(24, 29)
                ],
                [
                    { type: "h1", content: "Translation Practice" },
                    ...sivedContent.slice(30, 34)
                ]
            ]
        },
        {
            level: 11,
            content: [
                [
                    { type: "h1", content: '👍 Positive and Negative 👎' },
                    { type: "p", content: "Understanding Positive and Negative Statements in Igbo" },
                    { type: "h4", content: "" }
                ],
                [
                    { type: "h1", content: "Examples of Positive and Negative Statements" },
                    ...sivedContent.slice(2, 14),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Identifying and Forming Positive and Negative Statements" }
                ],
                [
                    { type: "h1", content: "Common Igbo Phrases" },
                    ...sivedContent.slice(16, 31),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Abstract Words in Igbo" }
                ],
                [
                    { type: "h1", content: "Abstract Words in Igbo" },
                    ...sivedContent.slice(33, 44),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Quick Question" }
                ],
                [
                    { type: "h1", content: "Quick Question" },
                    ...sivedContent.slice(46, 51),
                    { type: "h4", content: "" },
                    // { type: "h2", content: "Video Request" }
                ],
                // [
                //     { type: "h1", content: "Video Request" },
                //     ...sivedContent.slice(52, 56)
                // ]
            ]
        },
        {
            level: 12,
            content: [
                [
                    { type: "h1", content: "🔍 Let's Explore Questions in Igbo!" },
                    { type: "p", content: "Discovering how to ask questions using 'Where', 'When', and 'Which' 🌟" }
                ],
                [
                    { type: "h1", content: "🌈 Fun Questions with 'Where'" },
                    ...sivedContent.slice(4, 7),
                    { type: "h4", content: "" },
                    { type: "h1", content: "⏰ Fun Questions with 'When'" },
                    ...sivedContent.slice(8, 14),
                    { type: "h4", content: "" },
                    { type: "h1", content: "❓ Fun Questions with 'Which'" },
                    ...sivedContent.slice(16, 22),
                    { type: "h4", content: "" },
                ],
                [
                    { type: "h1", content: "🎯 Quick Quiz Time!" },
                    ...sivedContent.slice(24, 28),
                    { type: "h4", content: "" }
                ]
            ]
        }
    ]

    const { id } = useParams()
    const navTo = useNavigate()

    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        } else {
            getUser("/user/me", userSigned().token).then((data) => {
                setPlan(data.data.data.userPayment)
                setData(data.data.data)
                console.log(data.data.data);
            })


            postUserData('/lesson/oneLesson', { level: id }).then((data) => {
                eval('obj = ' + data.data.data.note)
                const newSivedContent = obj.filter(item => item.content && item.content.trim() !== "");
                if (JSON.stringify(newSivedContent) !== JSON.stringify(sivedContent)) {
                    setSivedContent(newSivedContent);
                }
                setNoteData(SplitLesson(obj, 8))
                setLessonData(data.data.data)
                document.getElementById("dasboardTitle").innerText = `Lesson ${id}`
                setModifiedContent(modifiedList)
                console.log(sivedContent);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [sivedContent])

    function SplitLesson(data, chunkSize) {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
    }

    function TrailPropmt() {
        return (
            <>
                <div className="trialBox">
                    <div className="trialBox-mail">
                        <h1>Unlock the level</h1>
                        <p>Level is locked to access the level upgrade your plan</p>
                        <div className="trialGroup">
                            <Link to={"/u/pricing"}>
                                <Button>View Pricing</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const radImage = [
        lessonHuman1,
        lessonHuman2
    ]
    function updateExp() {
        setLoading(true)
        if (parseInt(id) >= data.level) {
            postUser("/user/exp", { exp: 200 }, userSigned().token).then(() => {
                setLoading(false)
                navTo('/u/topics')
            })
        } else {
            navTo('/u/topics')
        }
    }

    return (
        <ClientLayout>
            {plan === "Trial" && parseInt(lessonData.level) >= 3 ? <TrailPropmt /> : <></>}


            <section className="lessons">

                <div className="desktopView">
                    <div className="sideHuman">
                        <div className="humanWrap">
                            <img
                                src={radImage[Math.floor(Math.random() * radImage.length)]}
                                style={{
                                    marginLeft: Math.floor(Math.random() * radImage.length == 1 ? "50px" : "-20px")
                                }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="textSection-lesson">
                        <div className="textLesson-in">
                            <div className='textWrap'  >
                                {
                                    modifiedContent[parseInt(id) - 1]?.content.map((item, index) => {
                                        if (index == 0) {
                                            return (
                                                <div className="lesWrap" key={"note" + index} id={"note" + index}>
                                                    <div className="lessonTextSection">
                                                        <div className="lessonTextArea">
                                                            {
                                                                item?.map((text, textIndex) => {
                                                                    return (
                                                                        <text.type className={text.type + "head"} key={"text" + textIndex}>{text.content}</text.type>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="textAction">


                                                        <Button state={loading} action={() => {
                                                            if (index < modifiedContent[parseInt(id) - 1]?.content.length - 1) {
                                                                document.getElementById("note" + index).style.display = "none"
                                                                document.getElementById(`note${parseInt(index) + 1}`).style.display = "block"
                                                            } else {
                                                                if (id === "4" || id === "8" || id === "12") {
                                                                    navTo("/u/quiz/" + id)
                                                                } else {
                                                                    updateExp()
                                                                }
                                                            }
                                                        }}>
                                                            {loading ? "loading..." : (
                                                                index < modifiedContent[parseInt(id) - 1]?.content.length - 1 ? "Next" : (
                                                                    id === "4" || id === "8" || id === "12" ? "Take Quiz" : "Next Lesson"
                                                                )
                                                            )}
                                                        </Button>
                                                        {
                                                            index == 0 ? <></> : (
                                                                <Button action={
                                                                    () => {
                                                                        document.getElementById(`note${parseInt(index)}`).style.display = "none"
                                                                        document.getElementById(`note${parseInt(index) - 1}`).style.display = "block"
                                                                    }
                                                                }>
                                                                    Back
                                                                </Button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }

                                        if (index > 0 && index != 0) {
                                            return (
                                                <div className="lesWrap" style={{ display: 'none' }} key={"note" + index} id={"note" + index}>
                                                    <div className="lessonTextSection">
                                                        <div className="lessonTextArea">
                                                            {
                                                                item?.map((text, textIndex) => {
                                                                    return (
                                                                        <text.type className={text.type + "head"} key={"text" + textIndex}>{text.content}</text.type>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="textAction">


                                                        <Button state={loading} action={() => {
                                                            if (index < modifiedContent[parseInt(id) - 1]?.content.length - 1) {
                                                                document.getElementById("note" + index).style.display = "none"
                                                                document.getElementById(`note${parseInt(index) + 1}`).style.display = "block"
                                                            } else {
                                                                if (id === "4" || id === "8" || id === "12") {
                                                                    navTo("/u/quiz/" + id)
                                                                } else {
                                                                    updateExp()
                                                                }
                                                            }
                                                        }}>
                                                            {loading ? "loading..." : (
                                                                index < modifiedContent[parseInt(id) - 1]?.content.length - 1 ? "Next" : (
                                                                    id === "4" || id === "8" || id === "12" ? "Take Quiz" : "Next Lesson"
                                                                )
                                                            )}
                                                        </Button>
                                                        {
                                                            index == 0 ? <></> : (
                                                                <Button action={
                                                                    () => {
                                                                        document.getElementById(`note${parseInt(index)}`).style.display = "none"
                                                                        document.getElementById(`note${parseInt(index) - 1}`).style.display = "block"
                                                                    }
                                                                }>
                                                                    Back
                                                                </Button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </ClientLayout>
    )
}