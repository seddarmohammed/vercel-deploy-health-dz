// src/SalaryCalculator.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Languages,
  ArrowLeft,
  Download,
  Calculator,
  DollarSign,
} from "lucide-react";
import { Card, CardTitle, CardContent } from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import translations from "./data/translations";
import corpsList from "./data/corpsList";
import gradesList from "./data/gradesList";
import corpsData from "./data/corpsData";
import Header from "./components/Header"; // Importation du composant Header

const SalaryCalculator = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("ar"); // Initialiser en arabe
  const [selectedCorps, setSelectedCorps] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedEchelon, setSelectedEchelon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredGrades, setFilteredGrades] = useState([]);

  // États pour les animations du titre et de la description
  const [titleIndex, setTitleIndex] = useState(0);
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  // Référence pour la fiche de paie
  const payslipRef = useRef();

  const t = translations[language];

  // Fonction helper pour obtenir le nom selon la langue
  const getName = (item) => {
    if (!item) return "-";
    const name = language === "fr" ? item.name_fr : item.name_ar;
    return name || "-";
  };

  // Gestion des changements de sélection
  const handleCorpsChange = (corpId) => {
    setSelectedCorps(corpId);
    setSelectedGrade("");
    setSelectedEchelon("");
    const grades = gradesList.filter(
      (grade) => grade.corp_id === parseInt(corpId)
    );
    setFilteredGrades(grades);
  };

  const handleGradeChange = (gradeId) => {
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

  // Effet pour les animations du titre et de la description
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % t.titles.length);
    }, 2000);

    const descriptionInterval = setInterval(() => {
      setDescriptionIndex(
        (prevIndex) => (prevIndex + 1) % t.descriptions.length
      );
    }, 2000);

    return () => {
      clearInterval(titleInterval);
      clearInterval(descriptionInterval);
    };
  }, [t.titles.length, t.descriptions.length]);

  /**
   * Fonction pour exporter la fiche de paie en PDF.
   */
  const exportPDF = () => {
    const input = payslipRef.current;
    if (!input) {
      alert("Impossible de trouver la section à exporter.");
      return;
    }

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("fiche-de-paie.pdf");
      })
      .catch((error) => {
        console.error("Erreur lors de la génération du PDF :", error);
        alert("Une erreur est survenue lors de l'exportation en PDF.");
      });
  };

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

  const renderResults = () => {
    const results = calculateSalary(); // Définition de 'results'

    return (
      <div className="space-y-6 pt-6 container mx-auto">
        <div
          className="bg-white rounded-lg p-6 sm:p-8 shadow-md"
          ref={payslipRef}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl sm:text-xl font-bold">{t.payslip}</h2>
          </div>

          <div className="space-y-6">
            {/* Employee Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-6">
                {/* Corps */}
                <div className="flex-1">
                  <h3 className="font-bold">{t.corps}</h3>
                  <p className="mt-1">
                    {corpsList.find(
                      (corp) => corp.id === parseInt(selectedCorps)
                    )?.[`name_${language}`] || "-"}
                  </p>
                </div>

                {/* Grade */}
                <div className="flex-1">
                  <h3 className="font-bold">{t.grade}</h3>
                  <p className="mt-1 flex items-center">
                    {gradesList.find(
                      (grade) => grade.id === parseInt(selectedGrade)
                    )?.[`name_${language}`] || "-"}
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {t.category}: {getGradeCategory()}
                    </span>
                  </p>
                </div>

                {/* Échelon & Indice */}
                <div className="flex-1">
                  <h3 className="font-bold">
                    {t.echelon} & {t.index}
                  </h3>
                  <p className="mt-1">
                    {selectedEchelon ? `${selectedEchelon}` : "-"} -{" "}
                    {getEchelonIndex()}
                  </p>
                </div>
              </div>
            </div>

            {/* Salary Details Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg sm:text-base">{t.baseSalary}</h3>
              <PayslipSection label={t.baseSalary} value={results.baseSalary} />

              <h3 className="font-bold text-lg sm:text-base mt-6">
                {t.allowances}
              </h3>
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

              <h3 className="font-bold text-lg sm:text-base mt-6">
                {t.deductions}
              </h3>
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

              {/* Bouton d'Exportation en PDF */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={exportPDF}
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
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-transparent`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-100 rounded-full">
              <DollarSign size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Titre Animé */}
          <CardTitle className="text-center mb-4 transition-opacity duration-500">
            {t.titles[titleIndex]}
          </CardTitle>

          {/* Description Animée */}
          <div className="text-center mb-8">
            <p className="transition-opacity duration-500">
              {t.descriptions[descriptionIndex]}
            </p>
            {language === "ar" && (
              <p className="text-sm sm:text-base text-gray-600">
                {translations["fr"].descriptions[descriptionIndex]}
              </p>
            )}
          </div>

          {/* Boutons de Sélection de Langue */}
          <div className="flex flex-col gap-4 mb-8 w-full">
            {["ar", "fr"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  simulateLoading(() => setStep(2)); // Redirection vers la page de sélection du corps
                }}
                className={`px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  language === lang
                    ? "bg-blue-600 text-white shadow-lg transform scale-[1.02]"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                } text-sm sm:text-base`}
              >
                <Languages size={20} />
                {lang === "fr" ? "Français" : "العربية"}
              </button>
            ))}
          </div>

          {/* Bouton de Suivant (Optionnel) */}
          {/* <button
            onClick={() => simulateLoading(() => setStep(2))}
            className="w-full bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 text-base sm:text-lg"
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
          </button> */}
        </CardContent>
      </Card>
    </div>
  );

  const renderForm = () => (
    <div className="min-h-screen p-4 bg-transparent">
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="pt-6">
          <button
            onClick={() => setStep(1)}
            className="mb-6 text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors text-sm sm:text-base"
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
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 sm:px-6 sm:py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
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
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 sm:px-6 sm:py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
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
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-300 px-4 py-3 sm:px-6 sm:py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
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
                  className="w-full bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-base sm:text-lg"
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

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 ${
        language === "ar" ? "font-arabic" : "font-sans"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header conditionnel : n'affiche le header que pour les étapes 2 et 3 */}
      {step !== 1 && <Header t={t} />} {/* Utilisation du composant Header */}
      {/* Contenu Principal */}
      <main className={`flex-1 container mx-auto ${step !== 1 ? "mt-0" : ""}`}>
        {renderStep()}
      </main>
    </div>
  );
};

export default SalaryCalculator;
