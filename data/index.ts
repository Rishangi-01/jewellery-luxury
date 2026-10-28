import originalSiteData from "./site.json";

export type RawSiteData = typeof originalSiteData;
export const commerceData = originalSiteData.Insurance.commerce;
export const productDetailsData = commerceData.productDetails;
export const productExtraDetailsData = commerceData.productExtraDetails;
export const productListingData = commerceData.productListing;
export const galleryData = commerceData.gallery;
export const blogData = commerceData.blog;
export const blogDetailsData = commerceData.blogDetails;
export const blogDetailsHeroData = commerceData.blogDetails.hero;
export const enquiryNowData = commerceData.enquiryNow;
export const enquiryNowHeroData = commerceData.enquiryNow.hero;
export const enquirySectionData = commerceData.enquiryNow.section;
export const signatureCollectionsData = commerceData.signatureCollections;

export type CommerceData = typeof commerceData;
export type ProductDetailsData = typeof productDetailsData;
export type ProductExtraDetailsData = typeof productExtraDetailsData;
export type ProductListingData = typeof productListingData;
export type galleryData = typeof galleryData;
export type blogData = typeof blogData;
export type blogDetailsData = typeof blogDetailsData;
export type blogDetailsHeroData = typeof blogDetailsHeroData;
export type enquiryNowData = typeof enquiryNowData;
export type enquiryNowHeroData = typeof enquiryNowHeroData;
export type EnquirySectionData = typeof enquirySectionData;
export type SignatureCollectionsData = typeof signatureCollectionsData;

export type InsuranceSchema = typeof originalSiteData.Insurance;
export type InsuranceSections = InsuranceSchema["sections"];
export type InsuranceTemplateComponents = InsuranceSchema["templateComponents"];

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

export type InsuranceSiteData = InsuranceSections["Site"]["variants"]["InsuranceSite1"];
export type InsuranceHeaderData = InsuranceSections["Header"]["variants"]["InsuranceHeader1"];
export type InsuranceHeroData = InsuranceSections["Hero"]["variants"]["InsuranceHero1"];
export type InsuranceHighlightsData = InsuranceSections["Highlights"]["variants"]["InsuranceHighlights1"];
export type InsuranceAboutData = InsuranceSections["About"]["variants"]["InsuranceAbout1"];
export type InsuranceWhyChooseUsData = InsuranceSections["WhyChooseUs"]["variants"]["InsuranceWhyChooseUs1"];
export type InsurancePlansData = InsuranceSections["Plans"]["variants"]["InsurancePlans1"];
export type InsurancePlanDetailData = InsuranceSections["PlanDetail"]["variants"]["InsurancePlanDetail1"];
export type InsuranceProcessData = InsuranceSections["Process"]["variants"]["InsuranceProcess1"];
export type InsuranceStatsData = InsuranceSections["Stats"]["variants"]["InsuranceStats1"];
export type InsuranceTestimonialsData = InsuranceSections["Testimonials"]["variants"]["InsuranceTestimonials1"];
export type InsuranceCtaData = InsuranceSections["Cta"]["variants"]["InsuranceCta1"];
export type InsuranceBlogData = InsuranceSections["Blog"]["variants"]["InsuranceBlog1"];
export type InsuranceBlogDetailData = InsuranceSections["BlogDetail"]["variants"]["InsuranceBlogDetail1"];
export type InsuranceEnquiryFormData = InsuranceSections["EnquiryForm"]["variants"]["InsuranceEnquiryForm1"];
export type InsuranceEnquirePageData = InsuranceSections["EnquirePage"]["variants"]["InsuranceEnquirePage1"];
export type InsuranceContactPageData = InsuranceSections["ContactPage"]["variants"]["InsuranceContactPage1"];
export type InsuranceTgihankYouPageData = InsuranceSections["ThankYouPage"]["variants"]["InsuranceThankYouPage1"];
export type InsuranceFaqPageData = InsuranceSections["FaqPage"]["variants"]["InsuranceFaqPage1"];
export type InsurancePolicyPagesData = InsuranceSections["PolicyPages"]["variants"]["InsurancePolicyPages1"];
export type InsuranceSitemapPageData = InsuranceSections["SitemapPage"]["variants"]["InsuranceSitemapPage1"];
export type InsuranceFooterData = InsuranceSections["Footer"]["variants"]["InsuranceFooter1"];

// ── Item-level types inferred from site.json ──
export type InsuranceNavLink = InsuranceHeaderData["links"][number];
export type InsurancePlan = InsurancePlansData["items"][number];
export type InsuranceTestimonial = InsuranceTestimonialsData["items"][number];
export type InsuranceBlogPost = InsuranceBlogData["posts"][number];
export type InsuranceFaqItem = InsuranceFaqPageData["items"][number];




// ── Legacy Site Map for Standalone Site ──
const sec = originalSiteData.Insurance.sections;

const legacySiteMap = {
  site: sec.Site.variants.InsuranceSite1,
  nav: sec.Header.variants.InsuranceHeader1,
  hero: sec.Hero.variants.InsuranceHero1,
  highlights: sec.Highlights.variants.InsuranceHighlights1.items,
  about: sec.About.variants.InsuranceAbout1,
  whyChooseUs: sec.WhyChooseUs.variants.InsuranceWhyChooseUs1,
  plans: sec.Plans.variants.InsurancePlans1,
  planDetail: sec.PlanDetail.variants.InsurancePlanDetail1,
  process: sec.Process.variants.InsuranceProcess1,
  stats: sec.Stats.variants.InsuranceStats1.items,
  testimonials: sec.Testimonials.variants.InsuranceTestimonials1,
  cta: sec.Cta.variants.InsuranceCta1,
  blogs: sec.Blog.variants.InsuranceBlog1,
  blogDetail: sec.BlogDetail.variants.InsuranceBlogDetail1,
  form: sec.EnquiryForm.variants.InsuranceEnquiryForm1,
  enquire: sec.EnquirePage.variants.InsuranceEnquirePage1,
  contact: sec.ContactPage.variants.InsuranceContactPage1,
  thankYou: sec.ThankYouPage.variants.InsuranceThankYouPage1,
  faq: sec.FaqPage.variants.InsuranceFaqPage1,
  policies: sec.PolicyPages.variants.InsurancePolicyPages1,
  sitemap: sec.SitemapPage.variants.InsuranceSitemapPage1,
  footer: sec.Footer.variants.InsuranceFooter1,
  Insurance: originalSiteData.Insurance,
};

export type SiteData = typeof legacySiteMap;
// Both names are exported so files can use either `site` or `siteData`
export const site = legacySiteMap;
export const siteData = legacySiteMap;
export default site;