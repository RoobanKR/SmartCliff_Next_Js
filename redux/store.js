import { configureStore } from "@reduxjs/toolkit";
import userSignInSlice from "./slices/user/Signin";
import userSignUpSlice from "./slices/user/Signup";
import superAdminSignUpSlice from "./slices/superAdminRegister/superAdminRegister";
import adminSignUpSlice from "./slices/adminRegister/adminRegister";
import categoryReducer from "./slices/category/category";
import careerOpportunitiesReducer from "./slices/careerOppertunities/careerOppertunities";
import softwareToolsReducer from "./slices/softwareTools/softwareTools";
import faqReducer from "./slices/faq/faq";
import instructorReducer from "./slices/instructor/instructor";
import courseReducer from "./slices/course/course";
import courseModuleReducer from "./slices/courseModules/courseModules";
import ourProgramReducer from "./slices/mca/ourProgram/ourProgram";
import aboutCollegeReducer from "./slices/mca/aboutCollege/aboutCollege";
import qualificationLearningReducer from "./slices/mca/qualificationLearning/qualificationLearning";
import semesterReducer from "./slices/mca/semester/Semester";
import assessmentReducer from "./slices/mca/assesment/Assesment";
import targetStudentReducer from "./slices/mca/targetStudent/targetStudent";
import programFeesReducer from "./slices/mca/programFees/ProgramFees";
import eligibilityCriteriaReducer from "./slices/mca/eligibility/Eligibility";
import degreeProgramReducer from "./slices/mca/degreeProgram/DegreeProgram";
import admissionProcessReducer from "./slices/mca/admissionProcess/AdmissionProcess";
import outcomeReducer from "./slices/mca/outcomes/Outcomes";
import highlightReducer from "./slices/mca/highlights/Highlights";
import programApplyReducer from "./slices/programApply/programApply";
import serviceReducer from "./slices/services/services/Services";
import businessServiceReducer from "./slices/services/services/businessServices";
import clientReducer from "./slices/services/client/Client";
import executionHighlightsReducer from "./slices/services/executionHighlights/Execution_Highlights";
import executionOverviewsReducer from "./slices/services/executionOverview/ExecutionOverview";
import testimonialReducer from "./slices/services/testimonial/Testimonial";
import batchesReducer from "./slices/batch/batches";
import entrollBatchReducer from "./slices/entrollBatches/entrollBatch";
import hirefromusReducer from "./slices/hirefromus/Hirefromus";
import hiringReducer from "./slices/hiring/hiring/hiring";
import managedCampusReducer from "./slices/services/managedCampus/managedCampus";
import keyElementsReducer from "./slices/bussiness/keyElements/keyElements";
import placementTestimonialReducer from "./slices/bussiness/placementTestimonial/placementTestimonial";
import trainfromusReducer from "./slices/hiring/trainFromUs/trainFromus";
import instituteReducer from "./slices/hiring/institute/institute";
import engagedGovernanceReducer from "./slices/hiring/engagedGovernance/engagedGovernance";
import ServiceAboutSlice from "./slices/services/services/aboutServices";
import ServiceProcessSlice from "./slices/services/services/processServices";
import serviceClientReducer from "./slices/services/services/clientServices";
import serviceOpportunityReducer from "./slices/services/services/Oppertunities";
import enquiryReducer from "./slices/enquiry/enquiry";
import contactReducer from "./slices/contact/contact";
import careerFormReducer from "./slices/career/careerForm";
import reviewReducer from "./slices/review/review";
import jobPositionsReducer from "./slices/joinUs/joinus";
import homeServiceReducer from "./slices/home/homeService/homeService";
import wcuReducer from "./slices/whyThis/whyThis";
import aboutUsReducer from "./slices/aboutUs/aboutUs";
import placementTrainingTrackReducer from "./slices/PlacementTrainingTrack/PlacementTrainingTrack";
import visionMissionReducer from "./slices/visionMission/visionMission";
import galleryReducer from "./slices/gallery/gallery";
import shineReducer from "./slices/shine/shine";
import ourPartnersReducer from "./slices/degreeProgram/dpPartner";
import ourSponsorsReducer from "./slices/degreeProgram/dpSponsor";
import learningJourneyReducer from "./slices/bussiness/learningJourney/learningJourney";
import howItWorksReducer from "./slices/bussiness/howItWorks/howItWorks";
import wcyHireReducer from "./slices/bussiness/whyCanYou//whyCanYou";
import careerReducer from "./slices/career/career";
import collegesReducer from "./slices/collegeDetails/collegeDetails";
import yearlyServiceReducer from "./slices/history/hsitory";
import skillVerticalReducer from "./slices/mca/skillVertical/skillVertical";
import currentAvailabilityReducer from "./slices/bussiness/currentAvailbility/currentAvailbility";
import homeExecutionHighlightsReducer from "./slices/home/homeExecutionHighlights/homeExecutionHighlights";
// import companyReducer from "./slices/";
import companyReducer from "./slices/mca/companyDetails/companyDetails";
import footerReducer from "./slices/footer/footer";
import popupNotificationReducer from "./slices/popUp/popUp";
import contactPageReducer from "./slices/contactPage/contactPage";
import addressReducer from "./slices/contactPage/address";
import dpBeneficiariesReducer from "./slices/mca/beneficiaries/beneficiaries"

export default configureStore({
  reducer: {
    userSignIn: userSignInSlice,
    userSignUp: userSignUpSlice,
    superAdminRegister: superAdminSignUpSlice,
    adminRegister: adminSignUpSlice,
    category: categoryReducer,
    careerOpportunities: careerOpportunitiesReducer,
    softwareTools: softwareToolsReducer,
    faq: faqReducer,
    instructors: instructorReducer,
    courses: courseReducer,
    courseModule: courseModuleReducer,
    ourProgram: ourProgramReducer,
    aboutCollege: aboutCollegeReducer,
    qualificationLearning: qualificationLearningReducer,
    semester: semesterReducer,
    assessments: assessmentReducer,
    targetStudent: targetStudentReducer,
    programFees: programFeesReducer,
    eligibilityCriteria: eligibilityCriteriaReducer,
    degreeProgram: degreeProgramReducer,
    admissionProcess: admissionProcessReducer,
    outcomes: outcomeReducer,
    highlight: highlightReducer,
    programApply: programApplyReducer,
    service: serviceReducer,
    businessService: businessServiceReducer,
    aboutService: ServiceAboutSlice,
    processService: ServiceProcessSlice,
    clientService: serviceClientReducer,
    clients: clientReducer,
    executionHighlights: executionHighlightsReducer,
    executionOverviews: executionOverviewsReducer,
    testimonial: testimonialReducer,
    entrollBatch: entrollBatchReducer,
    batches: batchesReducer,
    hirefromus: hirefromusReducer,
    trainfromus: trainfromusReducer,
    hiring: hiringReducer,
    managedCampus: managedCampusReducer,
    serviceOpportunities: serviceOpportunityReducer,
    keyElements: keyElementsReducer,
    placementTestimonial: placementTestimonialReducer,
    institute: instituteReducer,
    colleges: collegesReducer,

    engagedGovernance: engagedGovernanceReducer,
    enquiry: enquiryReducer,
    contact: contactReducer,
    careerForm: careerFormReducer,
    reviews: reviewReducer,
    jobPositions: jobPositionsReducer,
    visionMission: visionMissionReducer,
    homeServices: homeServiceReducer,
    wcu: wcuReducer,
    aboutUs: aboutUsReducer,
    placementTrainingTrack: placementTrainingTrackReducer,
    gallery: galleryReducer,
    shine: shineReducer,
    ourPartners: ourPartnersReducer,
    ourSponsors: ourSponsorsReducer,
    learningJourney: learningJourneyReducer,
    howItWorks: howItWorksReducer,
    wcyHire: wcyHireReducer,
    career: careerReducer,
    yearlyService: yearlyServiceReducer,
    skillVertical: skillVerticalReducer,
    currentAvailability: currentAvailabilityReducer,
    homeExecutionHighlights: homeExecutionHighlightsReducer,
    companies: companyReducer,
    footer: footerReducer,
    popupNotification: popupNotificationReducer,
    contactPage: contactPageReducer,
    address: addressReducer, // Add this line
        dpBeneficiaries:dpBeneficiariesReducer,

  },
});
