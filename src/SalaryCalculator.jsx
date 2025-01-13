import React, { useState } from "react";
import {
  ChevronRight,
  Languages,
  ArrowLeft,
  Download,
  Calculator,
  DollarSign,
  LayoutDashboard, // Remplacé Dashboard par LayoutDashboard
} from "lucide-react";
import { Card, CardTitle, CardContent } from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";

const SalaryCalculator = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("fr");
  const [selectedCorps, setSelectedCorps] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedEchelon, setSelectedEchelon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredGrades, setFilteredGrades] = useState([]);

  const translations = {
    fr: {
      welcome: "Calculateur de Salaire de Personnel",
      chooseLang: "Choisissez votre langue",
      next: "Suivant",
      corps: "Corps",
      grade: "Grade",
      category: "Catégorie",
      echelon: "Échelon",
      index: "Indice",
      selectCorps: "Sélectionnez votre corps",
      selectGrade: "Sélectionnez votre grade",
      selectEchelon: "Sélectionnez votre échelon",
      calculate: "Calculer",
      salary: "Salaire",
      baseIndex: "Indice de base",
      baseSalary: "Salaire de base",
      allowances: "Indemnités",
      deductions: "Retenues",
      netSalary: "Salaire net",
      exportPdf: "Exporter en PDF",
      payslip: "Fiche de paie",
      generalAllowance: "Indemnité générale",
      specialAllowance: "Indemnité spéciale",
      transportAllowance: "Indemnité de transport",
      mutualInsurance: "Assurance mutuelle",
      socialSecurity: "Sécurité sociale",
      taxableIncome: "Revenu imposable",
      incomeTax: "Impôt sur le revenu",
      grossSalary: "Salaire brut",
      back: "Retour",
      dashboard: "Tableau de bord",
    },
    ar: {
      welcome: "حاسبة الراتب",
      chooseLang: "اختر لغتك",
      next: "التالي",
      corps: "السلك",
      grade: "الدرجة",
      category: "الفئة",
      echelon: "الرتبة",
      index: "المؤشر",
      selectCorps: "اختر السلك",
      selectGrade: "اختر الدرجة",
      selectEchelon: "اختر الرتبة",
      calculate: "حساب",
      salary: "الراتب",
      baseIndex: "المؤشر الأساسي",
      baseSalary: "الراتب الأساسي",
      allowances: "التعويضات",
      deductions: "الاقتطاعات",
      netSalary: "الراتب الصافي",
      exportPdf: "تصدير PDF",
      payslip: "ورقة الراتب",
      generalAllowance: "تعويض عام",
      specialAllowance: "تعويض خاص",
      transportAllowance: "تعويض النقل",
      mutualInsurance: "التأمين التعاضدي",
      socialSecurity: "الضمان الاجتماعي",
      taxableIncome: "الدخل الخاضع للضريبة",
      incomeTax: "ضريبة الدخل",
      grossSalary: "الراتب الإجمالي",
      back: "عودة",
      dashboard: "لوحة التحكم",
    },
  };

  const corpsList = [
    {
      id: 1,
      name_fr: "Enseignement Supérieur",
      name_ar: "التعليم العالي",
    },
    {
      id: 2,
      name_fr: "Administration",
      name_ar: "الإدارة",
    },
    {
      id: 3,
      name_fr: "Santé",
      name_ar: "الصحة",
    },
    // Ajoutez d'autres corps selon vos besoins
  ];

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

  const t = translations[language];

  // Fonction helper pour obtenir le nom selon la langue
  const getName = (item) => {
    if (!item) return "-";
    const name = language === "fr" ? item.name_fr : item.name_ar;
    console.log(`getName(${item.id}) [${language}]:`, name);
    return name || "-";
  };

  // Gestion des changements de sélection
  const handleCorpsChange = (corpId) => {
    console.log("Selected Corps ID:", corpId); // Pour débogage
    setSelectedCorps(corpId);
    setSelectedGrade("");
    setSelectedEchelon("");
    const grades = gradesList.filter(
      (grade) => grade.corp_id === parseInt(corpId)
    );
    console.log("Filtered Grades:", grades); // Pour débogage
    setFilteredGrades(grades);
  };

  const handleGradeChange = (gradeId) => {
    console.log("Selected Grade ID:", gradeId); // Pour débogage
    setSelectedGrade(gradeId);
    setSelectedEchelon("");
    // Si vous avez une logique supplémentaire pour les échelons, ajoutez-la ici
  };

  const simulateLoading = (callback) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 800);
  };

  const getGradeCategory = () => {
    if (selectedGrade) {
      const grade = gradesList.find((g) => g.id === parseInt(selectedGrade));
      return grade ? grade.category : "-";
    }
    return "-";
  };

  const getEchelonIndex = () => {
    if (selectedGrade && selectedEchelon) {
      const gradeId = parseInt(selectedGrade);
      const echelonNumber = parseInt(selectedEchelon);
      const echelon = corpsData[selectedCorps]?.grades[gradeId]?.echelons.find(
        (e) => e.number === echelonNumber
      );
      return echelon ? echelon.index : "-";
    }
    return "-";
  };

  const calculateSalary = () => {
    const index = getEchelonIndex();
    if (index === "-") return {};

    const baseValue = 100;

    const baseSalary = index * baseValue;
    const generalAllowance = baseSalary * 0.1;
    const specialAllowance = baseSalary * 0.15;
    const transportAllowance = 500;

    const grossSalary =
      baseSalary + generalAllowance + specialAllowance + transportAllowance;

    const mutualInsurance = grossSalary * 0.02;
    const socialSecurity = grossSalary * 0.04;
    const taxableIncome = grossSalary - (mutualInsurance + socialSecurity);
    const incomeTax = taxableIncome * 0.2;

    const netSalary =
      grossSalary - (mutualInsurance + socialSecurity + incomeTax);

    return {
      baseSalary,
      generalAllowance,
      specialAllowance,
      transportAllowance,
      grossSalary,
      mutualInsurance,
      socialSecurity,
      taxableIncome,
      incomeTax,
      netSalary,
    };
  };

  const PayslipSection = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">
        {value !== undefined && value !== "-" ? value.toLocaleString() : "-"} DH
      </span>
    </div>
  );

  const renderResults = () => {
    const results = calculateSalary(); // Ajout de la définition de 'results'

    return (
      <div className="space-y-6 pt-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t.payslip}</h2>
          </div>

          <div className="space-y-6">
            {/* Employee Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold w-1/3">{t.corps}</h3>
                  <p className="w-2/3">
                    {corpsList.find(
                      (corp) => corp.id === parseInt(selectedCorps)
                    )?.[`name_${language}`] || "-"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold w-1/3">{t.grade}</h3>
                  <p className="w-2/3 flex items-center">
                    {gradesList.find(
                      (grade) => grade.id === parseInt(selectedGrade)
                    )?.[`name_${language}`] || "-"}
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {t.category}: {getGradeCategory()}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold w-1/3">
                    {t.echelon} & {t.index}
                  </h3>
                  <div className="w-2/3 flex space-x-4">
                    <p>{selectedEchelon ? `${selectedEchelon}` : "-"}</p>
                    <p>{getEchelonIndex()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Details Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">{t.baseSalary}</h3>
              <PayslipSection label={t.baseSalary} value={results.baseSalary} />

              <h3 className="font-bold text-lg mt-6">{t.allowances}</h3>
              <PayslipSection
                label={t.generalAllowance}
                value={results.generalAllowance}
              />
              <PayslipSection
                label={t.specialAllowance}
                value={results.specialAllowance}
              />
              <PayslipSection
                label={t.transportAllowance}
                value={results.transportAllowance}
              />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <PayslipSection
                  label={t.grossSalary}
                  value={results.grossSalary}
                />
              </div>

              <h3 className="font-bold text-lg mt-6">{t.deductions}</h3>
              <PayslipSection
                label={t.mutualInsurance}
                value={results.mutualInsurance}
              />
              <PayslipSection
                label={t.socialSecurity}
                value={results.socialSecurity}
              />
              <PayslipSection label={t.incomeTax} value={results.incomeTax} />

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <PayslipSection label={t.netSalary} value={results.netSalary} />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    alert(
                      "La fonctionnalité d'export PDF n'est pas encore implémentée."
                    );
                  }}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Download size={20} />
                  {t.exportPdf}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-100 rounded-full">
              <DollarSign size={32} className="text-blue-600" />
            </div>
          </div>

          <CardTitle className="text-center mb-8">{t.welcome}</CardTitle>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {["fr", "ar"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  language === lang
                    ? "bg-blue-600 text-white shadow-lg transform scale-[1.02]"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Languages size={20} />
                {lang === "fr" ? "Français" : "العربية"}
              </button>
            ))}
          </div>

          <button
            onClick={() => simulateLoading(() => setStep(2))}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                {t.next}
                <ChevronRight
                  className={language === "ar" ? "rotate-180" : ""}
                />
              </>
            )}
          </button>
        </CardContent>
      </Card>
    </div>
  );

  const renderForm = () => (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="max-w-xl mx-auto">
        <CardContent className="pt-6">
          <button
            onClick={() => setStep(1)}
            className="mb-6 text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className={language === "ar" ? "rotate-180" : ""} />
            {t.back}
          </button>

          <div className="space-y-6">
            <div className="grid gap-4">
              {/* Sélecteur de Corps */}
              <div className="relative">
                <select
                  id="corps-select"
                  value={selectedCorps}
                  onChange={(e) => handleCorpsChange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">{t.selectCorps}</option>
                  {corpsList.map((corp) => (
                    <option key={corp.id} value={corp.id}>
                      {getName(corp)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Sélecteur de Grade */}
              {selectedCorps && (
                <div className="relative">
                  <select
                    id="grade-select"
                    value={selectedGrade}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">{t.selectGrade}</option>
                    {filteredGrades.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {getName(grade)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight size={16} />
                  </div>
                </div>
              )}

              {/* Affichage de la Catégorie */}
              {selectedGrade && (
                <>
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription>
                      {t.category}: {getGradeCategory() || "-"}
                    </AlertDescription>
                  </Alert>

                  {/* Sélecteur d'Échelon */}
                  <div className="relative">
                    <select
                      id="echelon-select"
                      value={selectedEchelon}
                      onChange={(e) => setSelectedEchelon(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t.selectEchelon}</option>
                      {corpsData[selectedCorps]?.grades[
                        parseInt(selectedGrade)
                      ]?.echelons.map((echelon) => (
                        <option key={echelon.number} value={echelon.number}>
                          {t.echelon} {echelon.number} - {t.index}{" "}
                          {echelon.index}
                        </option>
                      )) || <option value="-">-</option>}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </>
              )}

              {/* Bouton de Calcul */}
              {selectedEchelon && (
                <button
                  onClick={() => simulateLoading(() => setStep(3))}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Calculator size={20} />
                      {t.calculate}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  /**
   * Renders the appropriate component based on the current step.
   *
   * @returns {JSX.Element} The component corresponding to the current step:
   * - Step 1: Welcome screen
   * - Step 2: Form for user input
   * - Step 3: Results display
   */
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderWelcome();
      case 2:
        return renderForm();
      case 3:
        return renderResults();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Fixe */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={24} className="text-blue-600" />{" "}
            {/* Utilisation de LayoutDashboard */}
            <span className="font-bold text-xl">{t.dashboard}</span>
          </div>
          {/* Vous pouvez ajouter d'autres éléments au header ici */}
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="flex-1 mt-16">{renderStep()}</main>
    </div>
  );
};

export default SalaryCalculator;
