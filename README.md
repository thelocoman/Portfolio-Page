Hello,

Welcome to my portfolio website, built to serve as an index of the work I am currently doing. It is designed to help me communicate and structure what I have to offer as a developer, which projects and tools I have worked on and offer, and my vision of building a trillion-dollar company in a structured and comprehensive form.

The project is built using Next.js and utilizes the type safety of TypeScript. Below is the breakdown of the project structure, and inside each file, you can find comments explaining what the code does.

Portfolio-Page/ `The entire project from top to bottom`
├── Client `The front-end part of the project that is delivered to the user (client)`
│   └── portfolio-page `The base folder for the next.js application containing the project folders and configuration files. (1)`
│       ├── app `Houses the Next.js App Router setup, global styles, root layout shell, favicon, and primary page entry points. (2)`
│       ├── components `Contains all reusable React UI elements, organized into layout wrappers, section blocks, features, and base primitives. (3)`
│       ├── constants `Stores immutable configuration data, static icon maps, navigation structures, and fixed application options. (4)`
│       ├── data `Holds static content datasets, project details, skill inventories, media metadata, and video transcript files.(5)`
│       ├── hooks `Houses custom React hooks encapsulating reusable stateful logic, physics calculations, mouse events, and side effects. (6)`
│       ├── public `Serves raw static media assets directly at the root URL, including images, graphics, icons, and video files. (7)`
│       ├── tests `Contains automated test suites for verifying application reliability through unit testing (Vitest) and end-to-end scenarios (Playwright). (8)`
│       ├── types `Defines custom TypeScript interfaces and type definitions to ensure strict type safety across components and data models. (9)`
│       └── utils `Stores pure JavaScript and TypeScript helper functions, mathematical formulas, and geometric calculation logic. (10)`
├── Infrastructure `The backend part of the project that handles client interactions received from the user`
└── README.md


# (1) Configuration files include:
**BUILD AND FRAMEWORK CONFIGUATION**
├──next.config.ts
├──next-env.d.ts
├──tsconfig.json

**DEPENDENCY AND PACKAGE MANAGEMENT**
├──package-lock.json
├──package.json

**CODE QUALITY AND STYLING**
├──eslint.config.mjs
├──postcss.config.mjs

**TESTING FRAMEWORKS**
├──vitest.setup.ts
├──vitest.config.ts
├──playwright.config.ts


# (2) App files include:
├──favicon.ico
├──globals.css
├──layout.tsx
├──page.tsx

# (3) Component files grouped in different folders based on the sections they manipulate
├── layouts
│   └── footer.tsx
└── sections
    ├── about
    │   ├── about.tsx
    │   ├── transcriptionModal.tsx
    │   └── videoSlide.tsx
    ├── contact
    │   ├── actionWheel.tsx
    │   ├── centralHub.tsx
    │   ├── contact.tsx
    │   └── rippleBackground.tsx
    ├── hero
    │   └── hero.tsx
    ├── projects
    │   ├── projectCard.tsx
    │   ├── projectCardDeck.tsx
    │   ├── projectPreview.tsx
    │   ├── projects.tsx
    │   └── techMarquee.tsx
    └── skills
        ├── skillCard.tsx
        ├── skillDeck.tsx
        ├── skillDetail.tsx
        ├── skills.tsx
        ├── skillSubtitleCard.tsx
        └── skillTitleCard.tsx

# (4) Files inside the constant folder:
├── contactActions.tsx
├── techIcons.ts

# (5) Data  files grouped in different folders to make it easier to scale 
├── projectsData.ts
├── skills-data.ts
├── transcripts
│   ├── Video_01_Transcript.ts
│   └── Video_02_Transcript.ts
└── videos.ts

# (6) Custom React hooks
├── useOrbitPhysics.ts
└── useRippleEffect.ts

# (7) Static media asset files
├── Authentication.png
├── back-3.png
├── back-4.png
├── BillionaireLife.png
├── In_Progress.png
├── My_Photo.jpeg
├── Portfolio_Page.png
├── Portfolio_Video.mp4
└── TrillionFlow_Video.mp4

# (8) Test files separated by their focus
├── E2E
│   └── portfolio.spec.ts
└── Unit
    └── project.test.tsx

# (9) Typescript types
├── about.types.ts
├── contact.types.ts
├── hero.types.ts
├── modal.types.ts
├── projects.types.ts
└── skills.types.ts

# (10) Mathematical logic files and helper functions
├── geometry.tsx
└── orbitGeometry.ts