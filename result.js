document.addEventListener('DOMContentLoaded', () => {
    initCommonPage();

    const resultsData = {
        "ENFJ": { name: "The Giver", desc: "Warm, empathetic, responsive, and responsible. Highly attuned to the emotions and needs of others. Natural leaders who inspire.", traits: ["Exceptionally good people skills", "Genuinely interested in others", "Value harmony and organization"], careers: [{t:"Counseling/Therapy", d:"Utilizes natural empathy and desire to heal.", i:"heart"}, {t:"Teaching", d:"Allows for inspiring and guiding others' growth.", i:"book-open"}, {t:"Human Resources", d:"Plays to strengths in understanding people and organizational harmony.", i:"users"}] },
        "ENTJ": { name: "The Executive", desc: "Frank, decisive, and naturally assumes leadership. Quickly sees illogical procedures and develops comprehensive systems to solve problems.", traits: ["Driven to turn theories into plans", "Natural leaders and strategists", "Highly value knowledge and efficiency"], careers: [{t:"Corporate Executive", d:"Fits the natural drive for leadership and structural improvement.", i:"briefcase"}, {t:"Business Strategy", d:"Utilizes long-range thinking and planning skills.", i:"trending-up"}, {t:"Law", d:"Applies logical analysis to complex, high-stakes environments.", i:"scale"}] },
        "ENFP": { name: "The Inspirer", desc: "Enthusiastic, creative, and spontaneous. Readily makes connections between events and quickly adapts based on patterns.", traits: ["Bright and capable", "Warmly interested in people", "Future-oriented and imaginative"], careers: [{t:"Writing/Journalism", d:"Capitalizes on strong communication and creative expression.", i:"pen-tool"}, {t:"Counseling", d:"Uses deep empathy and insight into human nature.", i:"heart"}, {t:"Entrepreneurship", d:"Benefits from adaptability, enthusiasm, and big-picture thinking.", i:"rocket"}] },
        "ENTP": { name: "The Visionary", desc: "Quick, ingenious, stimulating, and outspoken. Resourceful in solving new and challenging problems.", traits: ["Creative and ingenious", "Enjoy debating and generating ideas", "Logical, rational thinkers"], careers: [{t:"Entrepreneurship", d:"Perfect for generating ideas and solving novel problems.", i:"lightbulb"}, {t:"Consulting", d:"Allows for analyzing systems and offering innovative solutions.", i:"layers"}, {t:"Engineering", d:"Applies logic to create new possibilities.", i:"cpu"}] },
        "ESFJ": { name: "The Caregiver", desc: "Warmhearted, conscientious, and cooperative. Wants harmony in their environment and works with determination to establish it.", traits: ["Loyal and dependable", "Warm-hearted and sympathetic", "Enjoy creating order and structure"], careers: [{t:"Healthcare", d:"Fulfills the deep desire to care for others in a practical way.", i:"activity"}, {t:"Teaching", d:"Provides structured environments to nurture growth.", i:"book-open"}, {t:"Social Services", d:"Utilizes natural cooperative and supportive tendencies.", i:"users"}] },
        "ESFP": { name: "The Performer", desc: "Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoys working with others to make things happen.", traits: ["Live in the present moment", "Practical and realistic", "Great people skills"], careers: [{t:"Sales/Marketing", d:"Uses natural charm and ability to read people.", i:"target"}, {t:"Entertainment", d:"Plays to the desire to engage and perform for others.", i:"music"}, {t:"Hospitality", d:"Applies practical care and creates enjoyable environments.", i:"coffee"}] },
        "ESTJ": { name: "The Guardian", desc: "Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done.", traits: ["Natural leaders who like to be in charge", "Hard-working and dependable", "Excellent organizational abilities"], careers: [{t:"Management", d:"Utilizes structural and leadership capabilities.", i:"briefcase"}, {t:"Law Enforcement", d:"Fits the respect for rules, order, and practical application.", i:"shield"}, {t:"Finance", d:"Benefits from detail-orientation and logical execution.", i:"pie-chart"}] },
        "ESTP": { name: "The Doer", desc: "Flexible and tolerant, they take a pragmatic approach focused on immediate results. Bored by theories, want to act energetically.", traits: ["Action-oriented", "Highly observant and practical", "Resourceful troubleshooters"], careers: [{t:"Sales", d:"Thrives on fast-paced interaction and reading people.", i:"target"}, {t:"Athletics/Coaching", d:"Utilizes intense physical awareness and action orientation.", i:"activity"}, {t:"Emergency Services", d:"Capitalizes on the ability to stay calm and solve immediate crises.", i:"alert-triangle"}] },
        "INFJ": { name: "The Protector", desc: "Quietly forceful, original, and sensitive. Driven by personal integrity and deeply held values. Often have uncanny insight into people.", traits: ["Intuitively understand people", "Idealistic and highly principled", "Creative and visionary"], careers: [{t:"Psychology", d:"Uses profound insight into human nature.", i:"brain"}, {t:"Writing", d:"Allows for expression of complex internal visions.", i:"feather"}, {t:"Research", d:"Utilizes structured intuition and big-picture analysis.", i:"search"}] },
        "INFP": { name: "The Idealist", desc: "Idealistic, loyal to their values and to people who are important to them. Want an external life that is congruent with their values.", traits: ["Strong value systems", "Deep capacity for caring", "Creative and inspirational"], careers: [{t:"Writing", d:"Provides an outlet for deep internal feelings and creativity.", i:"feather"}, {t:"Counseling", d:"Uses genuine empathy and desire to heal.", i:"heart"}, {t:"Social Work", d:"Fulfills the mission to fight for the underdog and make a better world.", i:"users"}] },
        "INTJ": { name: "The Scientist", desc: "Have original minds and great drive for implementing their ideas. Quickly see patterns in external events and develop long-range perspectives.", traits: ["Driven to create order from abstraction", "Supreme strategists", "Extremely logical and independent"], careers: [{t:"Engineering", d:"Applies logic and systems thinking to complex problems.", i:"cpu"}, {t:"Scientific Research", d:"Satisfies the drive for deep, objective understanding.", i:"microscope"}, {t:"Corporate Strategy", d:"Utilizes long-range planning and structural vision.", i:"trending-up"}] },
        "INTP": { name: "The Thinker", desc: "Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than social interaction.", traits: ["Love theory and abstract ideas", "Independent and original", "Value knowledge above all else"], careers: [{t:"Software Development", d:"Perfect environment for solitary, logical problem solving.", i:"code"}, {t:"Mathematics", d:"Applies pure theoretical analysis.", i:"bar-chart-2"}, {t:"Architecture", d:"Combines structural logic with conceptual design.", i:"layout"}] },
        "ISFJ": { name: "The Nurturer", desc: "Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations. Thorough, painstaking, and accurate.", traits: ["Highly observant of people's feelings", "Dependable and hard-working", "Value security and tradition"], careers: [{t:"Healthcare", d:"Provides a structured way to deliver practical compassion.", i:"activity"}, {t:"Interior Design", d:"Utilizes strong spatial memory and aesthetic sense.", i:"home"}, {t:"Administration", d:"Benefits from meticulous attention to detail and reliability.", i:"file-text"}] },
        "ISFP": { name: "The Artist", desc: "Quiet, friendly, sensitive, and kind. Enjoy the present moment. Dislike disagreements and conflicts. Loyal to values.", traits: ["Keen awareness of environment", "Trusting and sensitive", "Strong aesthetic appreciation"], careers: [{t:"Art/Design", d:"Fulfills the need for tangible aesthetic creation.", i:"palette"}, {t:"Veterinary Care", d:"Utilizes gentle nature and unspoken empathy.", i:"heart"}, {t:"Counseling", d:"Applies deep, quiet compassion for others.", i:"users"}] },
        "ISTJ": { name: "The Duty Fulfiller", desc: "Quiet, serious, earn success by thoroughness and dependability. Practical, matter-of-fact, realistic, and responsible.", traits: ["Value tradition and security", "Loyal and faithful", "Profound respect for facts"], careers: [{t:"Accounting", d:"Requires meticulous attention to concrete facts and rules.", i:"pie-chart"}, {t:"Management", d:"Utilizes dependability and structural focus.", i:"briefcase"}, {t:"Medicine", d:"Applies rigorous knowledge and practical care.", i:"activity"}] },
        "ISTP": { name: "The Mechanic", desc: "Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work.", traits: ["Interested in how things work", "Action-oriented doers", "Excellent troubleshooters"], careers: [{t:"Engineering", d:"Satisfies the drive to take things apart and fix them.", i:"tool"}, {t:"Athletics", d:"Utilizes strong physical awareness and tactical thinking.", i:"activity"}, {t:"Cybersecurity", d:"Applies logical troubleshooting to practical crises.", i:"shield"}] }
    };

    const state = loadState();
    if (!state || !state.isComplete) {
        window.location.href = './index.html';
        return;
    }

    renderData(state);

    function renderData(state) {
        const data = resultsData[state.result];
        if (!data) return;

        document.getElementById('res-type').innerText = state.result;
        document.getElementById('res-name').innerText = data.name;
        document.getElementById('res-desc').innerText = data.desc;

        const s = state.scores;
        const pairs = [
            { left: 'Extraversion (E)', right: 'Introversion (I)', lScore: s.E, rScore: s.I, max: 10 },
            { left: 'Sensing (S)', right: 'Intuition (N)', lScore: s.S, rScore: s.N, max: 20 },
            { left: 'Thinking (T)', right: 'Feeling (F)', lScore: s.T, rScore: s.F, max: 20 },
            { left: 'Judging (J)', right: 'Perceiving (P)', lScore: s.J, rScore: s.P, max: 20 }
        ];

        document.getElementById('res-scores').innerHTML = pairs.map(p => {
            const leftDom = p.lScore >= p.rScore; const pct = (p.lScore / p.max) * 100;
            return `<div class="score-bar-wrapper"><div class="score-labels"><span class="${leftDom ? 'dominant' : ''}">${p.left}</span><span class="${!leftDom ? 'dominant' : ''}">${p.right}</span></div><div class="score-track"><div class="score-fill" style="width: ${pct}%"></div></div></div>`;
        }).join('');

        document.getElementById('res-traits').innerHTML = data.traits.map(t => `<div class="trait-chip"><i data-lucide="check"></i> ${t}</div>`).join('');
        document.getElementById('res-careers').innerHTML = data.careers.map(c => `<div class="career-card"><div class="career-icon"><i data-lucide="${c.i}"></i></div><div class="career-info"><h4>${c.t}</h4><p>${c.d}</p></div></div>`).join('');
        
        lucide.createIcons();
    }

    document.getElementById('download-btn').addEventListener('click', async () => {
        playNavSound(); 
        const btn = document.getElementById('download-btn'); 
        const wrapper = document.getElementById('action-buttons'); 
        const panel = document.querySelector('.glass-panel');
        
        const originalHTML = btn.innerHTML; 
        btn.innerHTML = '<i data-lucide="loader"></i> Processing...'; 
        lucide.createIcons();
        wrapper.style.display = 'none';
        
        try {
            const canvas = await html2canvas(panel, { scale: 2, backgroundColor: '#1A0B18', useCORS: true, logging: false });
            const imgData = canvas.toDataURL('image/png'); const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2); 
            pdf.save(`Persona-Profile-${state.result}.pdf`);
        } catch (error) { 
            console.error("PDF creation failed:", error); 
            alert("Failed to generate PDF. Please try again."); 
        } finally { 
            wrapper.style.display = 'flex'; 
            btn.innerHTML = originalHTML; 
            lucide.createIcons(); 
        }
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        playNavSound();
        resetState();
        navigateTo('./index.html');
    });
});
