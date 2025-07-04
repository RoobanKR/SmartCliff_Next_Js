import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category/category";
import softwareToolsReducer from "./slices/softwareTools/softwareTools";
import faqReducer from "./slices/faq/faq";
import courseReducer from "./slices/course/course";
import ourProgramReducer from "./slices/mca/ourProgram/ourProgram";
import aboutCollegeReducer from "./slices/mca/aboutCollege/aboutCollege";
import semesterReducer from "./slices/mca/semester/Semester";
import targetStudentReducer from "./slices/mca/targetStudent/targetStudent";
import degreeProgramReducer from "./slices/mca/degreeProgram/DegreeProgram";
import outcomeReducer from "./slices/mca/outcomes/Outcomes";
import serviceReducer from "./slices/services/services/Services";
import businessServiceReducer from "./slices/services/services/businessServices";
import clientReducer from "./slices/services/client/Client";
import executionHighlightsReducer from "./slices/services/executionHighlights/Execution_Highlights";
import executionOverviewsReducer from "./slices/services/executionOverview/ExecutionOverview";
import testimonialReducer from "./slices/services/testimonial/Testimonial";
import hirefromusReducer from "./slices/hirefromus/Hirefromus";
import managedCampusReducer from "./slices/services/managedCampus/managedCampus";
import keyElementsReducer from "./slices/bussiness/keyElements/keyElements";
import placementTestimonialReducer from "./slices/bussiness/placementTestimonial/placementTestimonial";
import trainfromusReducer from "./slices/hiring/trainFromUs/trainFromus";
import instituteReducer from "./slices/hiring/institute/institute";
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
    category: categoryReducer,
    softwareTools: softwareToolsReducer,
    faq: faqReducer,
    courses: courseReducer,
    ourProgram: ourProgramReducer,
    aboutCollege: aboutCollegeReducer,
    semester: semesterReducer,
    targetStudent: targetStudentReducer,
    degreeProgram: degreeProgramReducer,
    outcomes: outcomeReducer,
    service: serviceReducer,
    businessService: businessServiceReducer,
    aboutService: ServiceAboutSlice,
    processService: ServiceProcessSlice,
    clientService: serviceClientReducer,
    clients: clientReducer,
    executionHighlights: executionHighlightsReducer,
    executionOverviews: executionOverviewsReducer,
    testimonial: testimonialReducer,
    hirefromus: hirefromusReducer,
    trainfromus: trainfromusReducer,
    managedCampus: managedCampusReducer,
    serviceOpportunities: serviceOpportunityReducer,
    keyElements: keyElementsReducer,
    placementTestimonial: placementTestimonialReducer,
    institute: instituteReducer,
    colleges: collegesReducer,
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
