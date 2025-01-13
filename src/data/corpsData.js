// src/data/corpsData.js
const corpsData = {
    // Structure des échelons par corps et par grade
    1: {
        // ID du corps "Enseignement Supérieur"
        grades: {
            1: {
                // ID du grade "Professeur de l'Enseignement Supérieur"
                category: "A",
                echelons: Array.from({ length: 7 }, (_, i) => ({
                    number: i + 1,
                    index: 500 + i * 50,
                })),
            },
            2: {
                // ID du grade "Maître de Conférences"
                category: "A",
                echelons: Array.from({ length: 6 }, (_, i) => ({
                    number: i + 1,
                    index: 450 + i * 45,
                })),
            },
            3: {
                // ID du grade "Professeur Assistant"
                category: "A",
                echelons: Array.from({ length: 5 }, (_, i) => ({
                    number: i + 1,
                    index: 400 + i * 40,
                })),
            },
        },
    },
    2: {
        // ID du corps "Administration"
        grades: {
            4: {
                // ID du grade "Administrateur en Chef"
                category: "A",
                echelons: Array.from({ length: 6 }, (_, i) => ({
                    number: i + 1,
                    index: 450 + i * 45,
                })),
            },
            5: {
                // ID du grade "Administrateur Principal"
                category: "A",
                echelons: Array.from({ length: 5 }, (_, i) => ({
                    number: i + 1,
                    index: 400 + i * 40,
                })),
            },
            6: {
                // ID du grade "Administrateur"
                category: "B",
                echelons: Array.from({ length: 4 }, (_, i) => ({
                    number: i + 1,
                    index: 350 + i * 35,
                })),
            },
        },
    },
    3: {
        // ID du corps "Santé"
        grades: {
            7: {
                // ID du grade "Médecin Chef"
                category: "A",
                echelons: Array.from({ length: 6 }, (_, i) => ({
                    number: i + 1,
                    index: 450 + i * 45,
                })),
            },
            8: {
                // ID du grade "Médecin Spécialiste"
                category: "A",
                echelons: Array.from({ length: 5 }, (_, i) => ({
                    number: i + 1,
                    index: 400 + i * 40,
                })),
            },
            9: {
                // ID du grade "Infirmier Principal"
                category: "B",
                echelons: Array.from({ length: 4 }, (_, i) => ({
                    number: i + 1,
                    index: 350 + i * 35,
                })),
            },
        },
    },
    // Ajoutez d'autres corps avec leurs grades et échelons
};

export default corpsData;
