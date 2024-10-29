// sampleData.ts

export const sampleData = {
  users: [
    {
      email: "sample@sample1.com",
      slug: "sample1",
      password: "sample1",
      name: "Sample User 1",
    },
    // Add more users as needed
  ],
  actions: [
    {
      slug: "idle",
      name: "Idle",
      icon: "🧘",
    },
    // Add more actions as needed
  ],
  creators: [
    {
      slug: "UlanCabanilla",
      name: "Ulan Cabanilla",
      description: "",
      roles: ["creator"],
    },
    // Add more creators as needed
  ],
  sponsors: [
    {
      id: "1",
      name: "AAA",
      description: "AAA",
      url: "https://example.com",
      published: "",
      updated: "",
      amount: 10000,
    },
    // Add more sponsors as needed
  ],
  categories: [
    {
      slug: "real",
      name: "Real",
      icon: "🟦",
      color: "bg-emerald-500",
    },
    // Add more categories as needed
  ],
  models: [
    {
      slug: "animated_cube",
      resolutions: ["1k"],
      formats: ["glb"],
      usedFormat: "glb",
      scale: 1,
      rotationDegrees: { x: 0, y: 0, z: 0 },
      name: "Animated Cube",
      description: "",
      creator: "YuriNakanishi",
      published: "2024-01-02",
      updated: "2024-01-02",
      categoryTags: ["technology", "real"],
      price: 0,
      license: "CC0",
      credit: "",
      actions: ["rotate_horizontal", "rotate_vertical"],
      isDownloadable: true,
    },
    // Add more models as needed
  ],
};
