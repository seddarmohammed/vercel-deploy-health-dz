// src/data/gradesList.js
const gradesList = [
    // Grades pour le corps "Enseignement Supérieur" (id: 1)
    {
        id: 1,
        corp_id: 1,
        name_fr: "Professeur de l'Enseignement Supérieur",
        name_ar: "أستاذ التعليم العالي",
        category: "A",
    },
    {
        id: 2,
        corp_id: 1,
        name_fr: "Maître de Conférences",
        name_ar: "أستاذ مساعد",
        category: "A",
    },
    {
        id: 3,
        corp_id: 1,
        name_fr: "Professeur Assistant",
        name_ar: "أستاذ مساعد",
        category: "A",
    },
    // Grades pour le corps "Administration" (id: 2)
    {
        id: 4,
        corp_id: 2,
        name_fr: "Administrateur en Chef",
        name_ar: "مدير أول",
        category: "A",
    },
    {
        id: 5,
        corp_id: 2,
        name_fr: "Administrateur Principal",
        name_ar: "مدير رئيسي",
        category: "A",
    },
    {
        id: 6,
        corp_id: 2,
        name_fr: "Administrateur",
        name_ar: "مدير",
        category: "B",
    },
    // Grades pour le corps "Santé" (id: 3)
    {
        id: 7,
        corp_id: 3,
        name_fr: "Médecin Chef",
        name_ar: "طبيب رئيسي",
        category: "A",
    },
    {
        id: 8,
        corp_id: 3,
        name_fr: "Médecin Spécialiste",
        name_ar: "طبيب متخصص",
        category: "A",
    },
    {
        id: 9,
        corp_id: 3,
        name_fr: "Infirmier Principal",
        name_ar: "ممرض رئيسي",
        category: "B",
    },
    // Ajoutez d'autres grades selon vos besoins
];

export default gradesList;
