/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        // ── Base ────────────────────────────────────────────────────────────
        { fieldName: "background",        type: "color", required: true,  label: "Background" },
        { fieldName: "foreground",        type: "color", required: true,  label: "Foreground" },
        // ── Card ────────────────────────────────────────────────────────────
        { fieldName: "card",              type: "color", required: true,  label: "Card" },
        { fieldName: "cardForeground",    type: "color", required: true,  label: "Card Foreground" },
        // ── Popover ─────────────────────────────────────────────────────────
        { fieldName: "popover",           type: "color", required: true,  label: "Popover" },
        { fieldName: "popoverForeground", type: "color", required: true,  label: "Popover Foreground" },
        // ── Primary ─────────────────────────────────────────────────────────
        { fieldName: "primary",           type: "color", required: true,  label: "Primary" },
        { fieldName: "primaryForeground", type: "color", required: true,  label: "Primary Foreground" },
        // ── Secondary ───────────────────────────────────────────────────────
        { fieldName: "secondary",           type: "color", required: true,  label: "Secondary" },
        { fieldName: "secondaryForeground", type: "color", required: true,  label: "Secondary Foreground" },
        // ── Muted ───────────────────────────────────────────────────────────
        { fieldName: "muted",           type: "color", required: true,  label: "Muted" },
        { fieldName: "mutedForeground", type: "color", required: true,  label: "Muted Foreground" },
        // ── Accent ──────────────────────────────────────────────────────────
        { fieldName: "accent",           type: "color", required: true,  label: "Accent" },
        { fieldName: "accentForeground", type: "color", required: true,  label: "Accent Foreground" },
        // ── Destructive ─────────────────────────────────────────────────────
        { fieldName: "destructive",           type: "color", required: true,  label: "Destructive" },
        { fieldName: "destructiveForeground", type: "color", required: true,  label: "Destructive Foreground" },
        // ── Border / Input / Ring ────────────────────────────────────────────
        { fieldName: "border", type: "color", required: true, label: "Border" },
        { fieldName: "input",  type: "color", required: true, label: "Input" },
        { fieldName: "ring",   type: "color", required: true, label: "Ring" },
        // ── Charts ──────────────────────────────────────────────────────────
        { fieldName: "chart1", type: "color", required: false, label: "Chart 1" },
        { fieldName: "chart2", type: "color", required: false, label: "Chart 2" },
        { fieldName: "chart3", type: "color", required: false, label: "Chart 3" },
        { fieldName: "chart4", type: "color", required: false, label: "Chart 4" },
        { fieldName: "chart5", type: "color", required: false, label: "Chart 5" },
        // ── Navbar ──────────────────────────────────────────────────────────
        { fieldName: "navbarBackground", type: "color", required: true, label: "Navbar Background" },
        // ── Sidebar ─────────────────────────────────────────────────────────
        { fieldName: "sidebarBackground",        type: "color", required: true,  label: "Sidebar Background" },
        { fieldName: "sidebarForeground",        type: "color", required: true,  label: "Sidebar Foreground" },
        { fieldName: "sidebarPrimary",           type: "color", required: true,  label: "Sidebar Primary" },
        { fieldName: "sidebarPrimaryForeground", type: "color", required: true,  label: "Sidebar Primary Foreground" },
        { fieldName: "sidebarAccent",            type: "color", required: true,  label: "Sidebar Accent" },
        { fieldName: "sidebarAccentForeground",  type: "color", required: true,  label: "Sidebar Accent Foreground" },
        { fieldName: "sidebarBorder",            type: "color", required: true,  label: "Sidebar Border" },
        { fieldName: "sidebarRing",              type: "color", required: true,  label: "Sidebar Ring" },
      ],
    },

    {
      fieldName: "font",
      type: "object",
      required: true,
      label: "Typography",
      fields: [
        {
          fieldName: "headingFont",
          type: "enum",
          required: true,
          label: "Heading Font",
          options: [
            "Inter",
            "Plus Jakarta Sans",
            "Poppins",
            "Montserrat",
            "Raleway",
            "Playfair Display",
            "Lora",
            "Merriweather",
            "EB Garamond",
            "Cinzel",
            "Cormorant Garamond",
            "Libre Baskerville",
            "PT Serif",
            "Nunito",
            "Outfit",
            "DM Sans",
            "Sora",
            "Space Grotesk",
            "Josefin Sans",
            "Rubik",
            "Quicksand",
            "Figtree",
            "Lexend",
          ],
        },
        {
          fieldName: "textFont",
          type: "enum",
          required: true,
          label: "Text Font",
          options: [
            "Inter",
            "Plus Jakarta Sans",
            "Poppins",
            "Montserrat",
            "Raleway",
            "Lora",
            "Merriweather",
            "EB Garamond",
            "Libre Baskerville",
            "PT Serif",
            "Nunito",
            "Outfit",
            "DM Sans",
            "Sora",
            "Source Sans 3",
            "Noto Sans",
            "Lato",
            "Open Sans",
            "Roboto",
            "Rubik",
            "Quicksand",
            "Figtree",
            "Lexend",
          ],
        },
      ],
    },

    // ── ForgeRealms Landing Page Content ────────────────────────────────────
    { fieldName: "tagline", type: "string", required: false, label: "Tagline" },
    { fieldName: "heroHeading", type: "string", required: false, label: "Hero Heading" },
    { fieldName: "heroSubheading", type: "string", required: false, label: "Hero Subheading" },
    { fieldName: "heroCTALabel", type: "string", required: false, label: "Hero CTA Button Label" },
    { fieldName: "heroImageUrl", type: "url", required: false, label: "Hero Background Image URL" },

    // Features section
    { fieldName: "featuresHeading", type: "string", required: false, label: "Features Section Heading" },
    { fieldName: "featuresSubheading", type: "string", required: false, label: "Features Section Subheading" },
    {
      fieldName: "features",
      type: "array",
      label: "Features",
      item: {
        type: "object",
        fields: [
          { fieldName: "icon", type: "string", required: true, label: "Icon Name (lucide)" },
          { fieldName: "title", type: "string", required: true, label: "Feature Title" },
          { fieldName: "description", type: "string", required: true, label: "Feature Description" },
        ],
      },
    },

    // How it works
    { fieldName: "howItWorksHeading", type: "string", required: false, label: "How It Works Heading" },
    {
      fieldName: "steps",
      type: "array",
      label: "Steps",
      item: {
        type: "object",
        fields: [
          { fieldName: "number", type: "string", required: true, label: "Step Number" },
          { fieldName: "title", type: "string", required: true, label: "Step Title" },
          { fieldName: "description", type: "string", required: true, label: "Step Description" },
        ],
      },
    },

    // Map templates
    { fieldName: "templatesHeading", type: "string", required: false, label: "Templates Section Heading" },
    {
      fieldName: "mapTemplates",
      type: "array",
      label: "Map Templates",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Template Name" },
          { fieldName: "genre", type: "string", required: true, label: "Genre Tag" },
          { fieldName: "description", type: "string", required: true, label: "Description" },
          { fieldName: "players", type: "string", required: true, label: "Player Count" },
          { fieldName: "imageUrl", type: "url", required: false, label: "Preview Image URL" },
        ],
      },
    },

    // Waitlist section
    { fieldName: "waitlistHeading", type: "string", required: false, label: "Waitlist Section Heading" },
    { fieldName: "waitlistSubheading", type: "string", required: false, label: "Waitlist Section Subheading" },
    { fieldName: "waitlistCTALabel", type: "string", required: false, label: "Waitlist CTA Label" },
    { fieldName: "waitlistPlaceholder", type: "string", required: false, label: "Waitlist Email Placeholder" },

    // Social/footer
    { fieldName: "footerTagline", type: "string", required: false, label: "Footer Tagline" },
    { fieldName: "twitterUrl", type: "url", required: false, label: "Twitter/X URL" },
    { fieldName: "discordUrl", type: "url", required: false, label: "Discord URL" },

    // Feature flags
    { fieldName: "showTestimonials", type: "boolean", required: false, label: "Show Testimonials Section" },
    { fieldName: "showStats", type: "boolean", required: false, label: "Show Stats Section" },
  ],
};