import React, { useState } from "react";
import {
  ChevronRight,
  Languages,
  Home,
  ArrowLeft,
  Download,
  Calculator,
} from "lucide-react"; // Removed BadgeDollarSign

const SalaryCalculator = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("fr");
  const [selectedCorps, setSelectedCorps] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedEchelon, setSelectedEchelon] = useState("");

  const translations = {
    fr: {
      welcome: "Calculateur de Salaire",
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
      back: "Retour", // Added missing key
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
      back: "عودة", // Added missing key
    },
  };

  const corpsData = {
    "Enseignement Supérieur": {
      grades: {
        "Professeur de l'Enseignement Supérieur": {
          category: "A",
          echelons: Array.from({ length: 7 }, (_, i) => ({
            number: i + 1,
            index: 500 + i * 50,
          })),
        },
        "Maître de Conférences": {
          category: "A",
          echelons: Array.from({ length: 6 }, (_, i) => ({
            number: i + 1,
            index: 450 + i * 45,
          })),
        },
        "Professeur Assistant": {
          category: "A",
          echelons: Array.from({ length: 5 }, (_, i) => ({
            number: i + 1,
            index: 400 + i * 40,
          })),
        },
      },
    },
    Administration: {
      grades: {
        "Administrateur en Chef": {
          category: "A",
          echelons: Array.from({ length: 6 }, (_, i) => ({
            number: i + 1,
            index: 450 + i * 45,
          })),
        },
        "Administrateur Principal": {
          category: "A",
          echelons: Array.from({ length: 5 }, (_, i) => ({
            number: i + 1,
            index: 400 + i * 40,
          })),
        },
        Administrateur: {
          category: "B",
          echelons: Array.from({ length: 4 }, (_, i) => ({
            number: i + 1,
            index: 350 + i * 35,
          })),
        },
      },
    },
    Santé: {
      grades: {
        "Médecin Chef": {
          category: "A",
          echelons: Array.from({ length: 6 }, (_, i) => ({
            number: i + 1,
            index: 450 + i * 45,
          })),
        },
        "Médecin Spécialiste": {
          category: "A",
          echelons: Array.from({ length: 5 }, (_, i) => ({
            number: i + 1,
            index: 400 + i * 40,
          })),
        },
        "Infirmier Principal": {
          category: "B",
          echelons: Array.from({ length: 4 }, (_, i) => ({
            number: i + 1,
            index: 350 + i * 35,
          })),
        },
      },
    },
  };

  const t = translations[language];

  const getGradeCategory = () => {
    if (selectedCorps && selectedGrade) {
      return corpsData[selectedCorps].grades[selectedGrade].category;
    }
    return "-";
  };

  const getEchelonIndex = () => {
    if (selectedCorps && selectedGrade && selectedEchelon) {
      const echelon = corpsData[selectedCorps].grades[
        selectedGrade
      ].echelons.find((e) => e.number === parseInt(selectedEchelon));
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

  const FloatingButton = () => (
    <button
      onClick={() => setStep(1)}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      <Home size={24} />
    </button>
  );

  const renderResults = () => {
    const results = calculateSalary();

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t.payslip}</h2>
            <button
              onClick={() => {
                // PDF export logic can be implemented here using libraries like jsPDF or pdfmake
                alert("Export PDF feature is not implemented yet.");
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Download size={20} />
              {t.exportPdf}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">{t.corps}</h3>
                  <p>{selectedCorps}</p>
                </div>
                <div>
                  <h3 className="font-bold">{t.grade}</h3>
                  <p>{selectedGrade}</p>
                </div>
                <div>
                  <h3 className="font-bold">{t.category}</h3>
                  <p>{getGradeCategory()}</p>
                </div>
                <div>
                  <h3 className="font-bold">{t.baseIndex}</h3>
                  <p>{getEchelonIndex()}</p>
                </div>
              </div>
            </div>

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
            </div>
          </div>
        </div>
        <FloatingButton />
      </div>
    );
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <img
          src="/api/placeholder/300/200"
          alt="Welcome"
          className="mx-auto mb-8 rounded-lg shadow-md"
        />
        <h1
          className={`text-3xl font-bold mb-8 ${
            language === "ar" ? "font-arabic" : ""
          }`}
        >
          {t.welcome}
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setLanguage("fr")}
            className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              language === "fr"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Languages size={20} />
            Français
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              language === "ar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Languages size={20} />
            العربية
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            {t.next}
            <ChevronRight
              size={20}
              className={language === "ar" ? "rotate-180" : ""}
            />
          </button>

          <div className="text-sm text-gray-500">
            {language === "fr"
              ? "Calculez votre salaire en quelques clics"
              : "احسب راتبك في خطوات بسيطة"}
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={() => setStep(1)}
          className="mb-6 text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft
            size={20}
            className={language === "ar" ? "rotate-180" : ""}
          />
          {t.back}
        </button>

        <h2
          className={`text-2xl font-bold mb-6 ${
            language === "ar" ? "text-right" : ""
          }`}
        >
          {t.corps}
        </h2>

        <div className="space-y-6">
          {/* Corps Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.corps}
            </label>
            <select
              value={selectedCorps}
              onChange={(e) => {
                setSelectedCorps(e.target.value);
                setSelectedGrade("");
                setSelectedEchelon("");
              }}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">{t.selectCorps}</option>
              {Object.keys(corpsData).map((corp) => (
                <option key={corp} value={corp}>
                  {corp}
                </option>
              ))}
            </select>
          </div>

          {selectedCorps && (
            <div className="space-y-4">
              {/* Grade Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.grade}
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => {
                    setSelectedGrade(e.target.value);
                    setSelectedEchelon("");
                  }}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">{t.selectGrade}</option>
                  {Object.keys(corpsData[selectedCorps].grades).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              {selectedGrade && (
                <>
                  {/* Category Display */}
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <span className="font-medium">{t.category}:</span>{" "}
                    {corpsData[selectedCorps].grades[selectedGrade].category}
                  </div>

                  {/* Echelon Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.echelon}
                    </label>
                    <select
                      value={selectedEchelon}
                      onChange={(e) => setSelectedEchelon(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">{t.selectEchelon}</option>
                      {corpsData[selectedCorps].grades[
                        selectedGrade
                      ].echelons.map((echelon) => (
                        <option key={echelon.number} value={echelon.number}>
                          {t.echelon} {echelon.number} - {t.index}{" "}
                          {echelon.index}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEchelon && (
                    <button
                      onClick={() => setStep(3)}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                      <Calculator size={20} />
                      {t.calculate}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
    <div
      className={`min-h-screen bg-gray-100 ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {renderStep()}
    </div>
  );
};

export default SalaryCalculator;
