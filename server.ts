import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { FREELANCERS_DIRECTORY, FORUMS_DATA, Freelancer, Thread } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming json payloads safely
  app.use(express.json());

  // JSON File-Based Persistent Database Driver
  const DB_PATH = path.join(process.cwd(), "nexus_db.json");

  function loadDb() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const fileContent = fs.readFileSync(DB_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("[NEXUS DB] Gagal membaca database, menggunakan state bawaan:", err);
    }
    return null;
  }

  const savedDb = loadDb();

  // Unified persistent live state
  let freelancers: Freelancer[] = savedDb?.freelancers || [...FREELANCERS_DIRECTORY];
  let forumThreads: { [key: string]: Thread[] } = savedDb?.forumThreads || {
    umum: [...FORUMS_DATA.umum.threads],
    umkm: [...FORUMS_DATA.umkm.threads],
    freelance: [...FORUMS_DATA.freelance.threads],
  };
  let activeThreadReplies: { [key: string]: { author: string; text: string; time: string }[] } = savedDb?.activeThreadReplies || {
    u1: [
      { author: "Budi Santoso", text: "Terima kasih infonya mbak! Masalah cash flow emang bikin pusing pengerajin kaya saya.", time: "2 jam yang lalu" },
      { author: "Rian Prasetya", text: "Mantap, wajib dipisah rekening pribadi dan bisnis ya.", time: "1 jam yang lalu" }
    ]
  };
  let projectTasks = savedDb?.projectTasks || [
    { id: 't1', title: 'Selesaikan Desain Logo Selasar', stage: 'Rencana', priority: 'Tinggi', deadline: '25 Mei' },
    { id: 't2', title: 'Revisi Wireframe Landing Page', stage: 'Berjalan', priority: 'Sedang', deadline: '29 Mei' },
    { id: 't3', title: 'Serah Terima Invoice Draft ke Klien', stage: 'Selesai', priority: 'Rendah', deadline: '20 Mei' }
  ];
  let invoiceDetails = savedDb?.invoiceDetails || {
    client: "PT Nusantara Jaya",
    project: "Pengembangan Desain Identitas Brand & Kemasan",
    no: "INV/2026/004",
    date: "2026-05-21",
    due: "2026-06-04",
    ppn: true,
    items: [
      { id: 'i1', description: 'Studi Identitas & Desain Logo Baru', qty: 1, price: 3500000 },
      { id: 'i2', description: 'Desain Label & Kemasan Pouch Kopi', qty: 3, price: 500000 }
    ]
  };

  let sentOffers: any[] = savedDb?.sentOffers || [];

  function saveDb() {
    try {
      const dbPayload = {
        freelancers,
        forumThreads,
        activeThreadReplies,
        projectTasks,
        invoiceDetails,
        sentOffers
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(dbPayload, null, 2), "utf-8");
    } catch (err) {
      console.error("[NEXUS DB] Gagal menyimpan perubahan ke database:", err);
    }
  }

  // API - Get entire synced state
  app.get("/api/state", (req, res) => {
    // Elegant simulation of concurrent premium users online on the web workspace
    const baseHour = new Date().getHours();
    const onlineSim = Math.floor(14 + Math.sin(baseHour / 3.5) * 5 + Math.random() * 3);
    res.json({
      success: true,
      freelancers,
      forumThreads,
      activeThreadReplies,
      projectTasks,
      invoiceDetails,
      sentOffers,
      onlineCount: Math.max(10, onlineSim)
    });
  });

  // API - Register user / Add to directory
  app.post("/api/register", (req, res) => {
    const { name, role, bgGradient, rating, rate, location, tags, bio } = req.body;
    if (!name) return res.status(400).json({ error: "Nama wajib diisi" });

    const newCard: Freelancer = {
      id: `custom_${Date.now()}`,
      name,
      role: role || "Profesional Digital",
      avatarInitials: name.substring(0, 2).toUpperCase(),
      bgGradient: bgGradient || "from-yellow-100 to-amber-300 text-stone-900",
      rating: rating || 5.0,
      rate: rate || "Rp 150k - 300k / jam",
      location: location || "Jakarta, Indonesia",
      tags: tags && tags.length ? tags : ["NEXUS Partner"],
      bio: bio || "Professional member of NEXUS Indonesia.",
      portfolio: [
        { title: 'Proyek Perdana NEXUS', client: 'Klien Percobaan', year: '2026' }
      ]
    };

    freelancers = [newCard, ...freelancers];
    saveDb();
    res.json({ success: true, freelancer: newCard, freelancers });
  });

  // API - Submit new thread
  app.post("/api/forum/thread", (req, res) => {
    const { title, author, category } = req.body;
    if (!title || !category) return res.status(400).json({ error: "Missing required fields" });

    const threadId = `th_${Date.now()}`;
    const newThread: Thread = {
      id: threadId,
      title,
      author: author || "Pengguna Anonim",
      avatarInitials: (author || "Anonim").substring(0, 2).toUpperCase(),
      replies: 0,
      likes: 1,
      time: "Baru saja",
      category
    };

    if (forumThreads[category]) {
      forumThreads[category] = [newThread, ...forumThreads[category]];
    }
    saveDb();
    res.json({ success: true, thread: newThread, forumThreads });
  });

  // API - Submit forum reply
  app.post("/api/forum/reply", (req, res) => {
    const { threadId, author, text } = req.body;
    if (!threadId || !text) return res.status(400).json({ error: "Missing required fields" });

    const newReply = {
      author: author || "Tamu NEXUS",
      text,
      time: "Baru saja"
    };

    if (!activeThreadReplies[threadId]) {
      activeThreadReplies[threadId] = [];
    }
    activeThreadReplies[threadId].push(newReply);

    // Increment reply indicator count on thread list
    Object.keys(forumThreads).forEach(category => {
      forumThreads[category] = forumThreads[category].map(t => {
        if (t.id === threadId) {
          return { ...t, replies: t.replies + 1 };
        }
        return t;
      });
    });

    saveDb();
    res.json({ success: true, reply: newReply, activeThreadReplies, forumThreads });
  });

  // API - Like / Unlike Thread
  app.post("/api/forum/like", (req, res) => {
    const { threadId, category, hasLiked } = req.body;
    if (!threadId || !category) return res.status(400).json({ error: "Missing metadata" });

    if (forumThreads[category]) {
      forumThreads[category] = forumThreads[category].map(t => {
        if (t.id === threadId) {
          const diff = hasLiked ? -1 : 1;
          return { ...t, likes: Math.max(0, t.likes + diff) };
        }
        return t;
      });
    }
    saveDb();
    res.json({ success: true, forumThreads });
  });

  // API - Add Project Task
  app.post("/api/projects/task/add", (req, res) => {
    const { title, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Judul rancangan tugas diperlukan" });

    const newTask = {
      id: `task_${Date.now()}`,
      title,
      stage: 'Rencana',
      priority: priority || 'Sedang',
      deadline: 'Segera'
    };

    projectTasks.push(newTask);
    saveDb();
    res.json({ success: true, task: newTask, projectTasks });
  });

  // API - Move Kanban Project Task
  app.post("/api/projects/task/move", (req, res) => {
    const { taskId, direction } = req.body;
    if (!taskId || !direction) return res.status(400).json({ error: "Parameter tidak lengkap" });

    projectTasks = projectTasks.map(task => {
      if (task.id === taskId) {
        let currentStage = task.stage;
        let newStage = currentStage;
        if (direction === 'forward') {
          if (currentStage === 'Rencana') newStage = 'Berjalan';
          else if (currentStage === 'Berjalan') newStage = 'Selesai';
        } else {
          if (currentStage === 'Selesai') newStage = 'Berjalan';
          else if (currentStage === 'Berjalan') newStage = 'Rencana';
        }
        return { ...task, stage: newStage };
      }
      return task;
    });

    saveDb();
    res.json({ success: true, projectTasks });
  });

  // API - Delete Project Task
  app.post("/api/projects/task/delete", (req, res) => {
    const { taskId } = req.body;
    if (!taskId) return res.status(400).json({ error: "ID tugas kosong" });

    projectTasks = projectTasks.filter(t => t.id !== taskId);
    saveDb();
    res.json({ success: true, projectTasks });
  });

  // API - Sync invoice parameters fully on the server
  app.post("/api/invoice/update", (req, res) => {
    const { client, project, no, date, due, ppn, items } = req.body;
    invoiceDetails = {
      client: client !== undefined ? client : invoiceDetails.client,
      project: project !== undefined ? project : invoiceDetails.project,
      no: no !== undefined ? no : invoiceDetails.no,
      date: date !== undefined ? date : invoiceDetails.date,
      due: due !== undefined ? due : invoiceDetails.due,
      ppn: ppn !== undefined ? ppn : invoiceDetails.ppn,
      items: items !== undefined ? items : invoiceDetails.items
    };
    saveDb();
    res.json({ success: true, invoiceDetails });
  });

  // API - Send inbound partner offers
  app.post("/api/offers/send", (req, res) => {
    const { sender, receiver, message, channel } = req.body;
    const newOffer = {
      id: `offer_${Date.now()}`,
      sender: sender || "Pengunjung",
      receiver: receiver || "Partner",
      message: message || "Halo, saya tertarik bekerja sama dengan Anda.",
      channel: channel || "NEXUS Chat",
      date: "Baru saja"
    };
    sentOffers = [newOffer, ...sentOffers];
    saveDb();
    res.json({ success: true, offer: newOffer, sentOffers });
  });

  // Serve Vite assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NEXUS SERVER] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
