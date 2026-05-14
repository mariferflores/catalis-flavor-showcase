import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/catali-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catalí — Cocina Tradicional Veracruzana" },
      {
        name: "description",
        content:
          "Catalí: fonda de comida típica mexicana con sabores veracruzanos. Menú casero, ambiente cálido y lo mejor del Golfo en cada platillo.",
      },
      { property: "og:title", content: "Catalí — Cocina Tradicional Veracruzana" },
      {
        property: "og:description",
        content: "Fonda mexicana con auténtica gastronomía veracruzana.",
      },
    ],
  }),
  component: Index,
});

type Aviso = {
  id: string;
  title: string;
  desc: string;
  photo?: string;
  color: string;
  rotate: number;
  date: string;
};

const NOTE_COLORS = [
  "oklch(0.92 0.13 95)",   // amarillo
  "oklch(0.88 0.12 50)",   // durazno
  "oklch(0.9 0.1 145)",    // verde menta
  "oklch(0.88 0.1 25)",    // rosa coral
  "oklch(0.9 0.08 220)",   // azul cielo
];

const SEED_AVISOS: Aviso[] = [
  {
    id: "s1",
    title: "Domingo de Mariscos",
    desc: "Cada domingo: caldo largo, arroz a la tumbada y empanadas de jaiba. ¡Reserva tu mesa!",
    color: NOTE_COLORS[0],
    rotate: -3,
    date: "Cada domingo",
  },
  {
    id: "s2",
    title: "Café de Olla GRATIS",
    desc: "Con cualquier desayuno antes de las 10 a.m. Acompáñalo con pan de la casa.",
    color: NOTE_COLORS[2],
    rotate: 2,
    date: "Lun – Vie",
  },
  {
    id: "s3",
    title: "Noche Jarocha",
    desc: "Último viernes del mes: son jarocho en vivo y cena especial veracruzana.",
    color: NOTE_COLORS[3],
    rotate: -1,
    date: "Viernes 28",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Nosotros />
      <Menu />
      <Avisos />
      <Mapa />
      <Contacto />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Inicio", "#inicio"],
    ["Nosotros", "#nosotros"],
    ["Menú", "#menu"],
    ["Avisos", "#avisos"],
    ["Ubicación", "#mapa"],
    ["Contacto", "#contacto"],
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logo} alt="Logo Catalí" className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/40" />
          <span className="font-display text-xl font-bold tracking-tight">Catalí</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-foreground/75 hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="px-5 py-3 flex flex-col gap-3 text-sm">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-1">
                {l}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, white 0 1px, transparent 2px), radial-gradient(circle at 80% 70%, white 0 1px, transparent 2px)",
        backgroundSize: "40px 40px, 60px 60px",
      }} />
      <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-float-in">
          <p className="font-hand text-2xl text-accent mb-3">Cocina veracruzana, hecha en casa</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
            Sabores del Golfo, servidos con cariño.
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/85 max-w-lg">
            En <strong>Catalí</strong> rescatamos la mesa de la fonda mexicana: arroz a la tumbada, mole de Xico, picadas y café de olla. Pasa, siéntate, hay lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium shadow-paper hover:opacity-90 transition">
              Ver el menú
            </a>
            <a href="#mapa" className="px-6 py-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition">
              Cómo llegar
            </a>
          </div>
        </div>
        <div className="relative justify-self-center">
          <div className="absolute -inset-6 rounded-full bg-accent/30 blur-3xl" />
          <img src={logo} alt="Logo Catalí" className="relative w-64 md:w-80 rounded-full shadow-paper ring-4 ring-accent/40" />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="font-hand text-2xl text-primary mb-1">{kicker}</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Nosotros() {
  return (
    <section id="nosotros" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader kicker="— sobre nosotros —" title="Una fonda con alma jarocha" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-lg text-foreground/85 leading-relaxed">
            <p>
              Catalí nació de la nostalgia por las comidas de la abuela en Veracruz: el comal caliente, el aroma de la hoja santa y la sopa que siempre alcanza para uno más.
            </p>
            <p>
              Cocinamos con recetas heredadas, ingredientes del mercado y el ritmo tranquilo de una fonda de barrio. Aquí no hay prisa: hay sazón.
            </p>
            <ul className="grid grid-cols-3 gap-4 pt-4">
              {[
                ["+15", "años de oficio"],
                ["100%", "recetas caseras"],
                ["7", "días a la semana"],
              ].map(([n, l]) => (
                <li key={l} className="text-center p-4 rounded-xl bg-card shadow-paper">
                  <div className="font-display text-3xl text-primary font-bold">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-paper bg-gradient-warm flex items-center justify-center">
            <img src={logo} alt="Catalí" className="w-2/3 opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 font-hand text-xl text-foreground/80 text-center">
              "La cocina es el corazón de la casa."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const MENU_DATA = [
  {
    cat: "Desayunos",
    items: [
      ["Picadas veracruzanas", "Tres picadas con salsa verde, roja y mole, queso fresco y cebolla.", "$95"],
      ["Huevos tirados", "Frijoles negros con huevo revuelto, plátano macho y totopos.", "$85"],
      ["Enfrijoladas de la casa", "Tortillas bañadas en frijol negro con epazote, crema y queso.", "$90"],
      ["Café de olla", "Con canela, piloncillo y un toque de cariño.", "$30"],
    ],
  },
  {
    cat: "Platos fuertes",
    items: [
      ["Arroz a la tumbada", "Arroz caldoso con camarón, pulpo, jaiba y pescado del día.", "$210"],
      ["Mole de Xico", "Pollo bañado en mole dulce de Xico, arroz blanco y tortillas hechas a mano.", "$165"],
      ["Pescado a la veracruzana", "Filete con jitomate, aceitunas, alcaparras y chiles güeros.", "$195"],
      ["Chilpachole de jaiba", "Caldo espeso de jitomate, chile y jaiba fresca.", "$175"],
    ],
  },
  {
    cat: "Antojitos & postres",
    items: [
      ["Empanadas de plátano", "Rellenas de frijol o queso, fritas al momento.", "$70"],
      ["Tamales de chipilín", "Envueltos en hoja, suavecitos y aromáticos.", "$45"],
      ["Dulce de calabaza", "Con piloncillo, canela y leche evaporada.", "$60"],
      ["Agua de jamaica", "Recién hecha, fría y bien dulce.", "$25"],
    ],
  },
];

function Menu() {
  return (
    <section id="menu" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          kicker="— el menú —"
          title="Lo que hoy hay en la cazuela"
          sub="Cocina del día con ingredientes de temporada. El menú cambia con lo que llega del mercado."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {MENU_DATA.map((g) => (
            <div key={g.cat} className="bg-card rounded-2xl p-6 shadow-paper border border-border/60">
              <h3 className="font-display text-2xl text-primary border-b border-dashed border-border pb-3 mb-4">
                {g.cat}
              </h3>
              <ul className="space-y-4">
                {g.items.map(([n, d, p]) => (
                  <li key={n}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold">{n}</span>
                      <span className="font-display text-primary font-bold">{p}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STORAGE_KEY = "catali_avisos";

function Avisos() {
  const [avisos, setAvisos] = useState<Aviso[]>(SEED_AVISOS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ title: string; desc: string; photo?: string }>({
    title: "",
    desc: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAvisos(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(avisos));
    } catch {}
  }, [avisos]);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, photo: reader.result as string }));
    reader.readAsDataURL(f);
  }

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const nuevo: Aviso = {
      id: Math.random().toString(36).slice(2),
      title: form.title.trim(),
      desc: form.desc.trim(),
      photo: form.photo,
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      rotate: Math.random() * 6 - 3,
      date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short" }),
    };
    setAvisos([nuevo, ...avisos]);
    setForm({ title: "", desc: "" });
    setShowForm(false);
  }

  function remove(id: string) {
    setAvisos(avisos.filter((a) => a.id !== id));
  }

  return (
    <section id="avisos" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          kicker="— el corcho —"
          title="Avisos y novedades"
          sub="Promociones, eventos y lo que se está cocinando esta semana."
        />

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium shadow-paper hover:opacity-90 transition"
          >
            {showForm ? "Cancelar" : "+ Agregar aviso"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={addNote}
            className="max-w-md mx-auto mb-10 p-6 rounded-2xl bg-card shadow-paper border border-border space-y-3 animate-float-in"
          >
            <input
              required
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background"
            />
            <textarea
              placeholder="Breve descripción"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background resize-none"
            />
            <label className="block text-sm">
              <span className="text-muted-foreground">Foto (opcional)</span>
              <input type="file" accept="image/*" onChange={handlePhoto} className="block mt-1 text-sm" />
            </label>
            {form.photo && (
              <img src={form.photo} alt="preview" className="w-full max-h-40 object-cover rounded-lg" />
            )}
            <button className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90">
              Pegar en el corcho
            </button>
          </form>
        )}

        <div className="bg-cork rounded-3xl p-6 md:p-10 shadow-paper border-[6px] border-[oklch(0.32_0.06_45)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {avisos.map((a) => (
              <article
                key={a.id}
                className="relative p-5 pt-7 rounded-sm shadow-note transition-transform hover:scale-[1.03] hover:rotate-0 group"
                style={{
                  backgroundColor: a.color,
                  transform: `rotate(${a.rotate}deg)`,
                  fontFamily: "'Caveat', cursive",
                }}
              >
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, oklch(0.65 0.2 25), oklch(0.4 0.18 25))",
                    boxShadow: "0 2px 3px oklch(0 0 0 / 0.4)",
                  }}
                />
                <button
                  onClick={() => remove(a.id)}
                  className="absolute top-1 right-2 text-foreground/40 opacity-0 group-hover:opacity-100 hover:text-destructive text-sm"
                  aria-label="Quitar"
                >
                  ✕
                </button>
                {a.photo && (
                  <img
                    src={a.photo}
                    alt={a.title}
                    className="w-full h-32 object-cover mb-3 rounded-sm border border-foreground/10"
                  />
                )}
                <h3 className="text-2xl font-bold text-foreground leading-tight">{a.title}</h3>
                {a.desc && <p className="mt-1 text-lg text-foreground/80 leading-snug">{a.desc}</p>}
                <p className="mt-3 text-sm text-foreground/50 font-sans">{a.date}</p>
              </article>
            ))}
            {avisos.length === 0 && (
              <p className="col-span-full text-center text-paper/80 py-12">El corcho está vacío.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mapa() {
  return (
    <section id="mapa" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          kicker="— ven a vernos —"
          title="¿Dónde estamos?"
          sub="En el corazón de Xalapa, a una cuadra del parque."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-paper border border-border aspect-[16/10]">
            <iframe
              title="Mapa Catalí"
              src="https://www.google.com/maps?q=Xalapa,Veracruz,Mexico&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-paper border border-border space-y-4">
            <div>
              <h4 className="font-display text-xl font-bold">Dirección</h4>
              <p className="text-muted-foreground mt-1">
                Av. Independencia 123<br />Centro, Xalapa, Veracruz
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl font-bold">Horario</h4>
              <p className="text-muted-foreground mt-1">
                Lun – Sáb · 8:00 – 19:00<br />Domingo · 9:00 – 17:00
              </p>
            </div>
            <a
              href="https://www.google.com/maps?q=Xalapa,Veracruz,Mexico"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-paper">
      <div className="max-w-4xl mx-auto px-5">
        <SectionHeader kicker="— escríbenos —" title="¿Reservar mesa? ¿Pedido para llevar?" />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            ["Teléfono", "228 123 4567", "tel:+522281234567"],
            ["WhatsApp", "Mándanos un mensaje", "https://wa.me/522281234567"],
            ["Correo", "hola@catali.mx", "mailto:hola@catali.mx"],
            ["Instagram", "@catali.mx", "https://instagram.com"],
          ].map(([t, v, h]) => (
            <a
              key={t}
              href={h}
              target={h.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="block p-6 rounded-2xl bg-card shadow-paper border border-border hover:border-primary transition group"
            >
              <p className="text-sm text-muted-foreground">{t}</p>
              <p className="font-display text-2xl text-primary mt-1 group-hover:translate-x-1 transition">
                {v} →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 rounded-full ring-2 ring-accent/40" />
          <div>
            <p className="font-display text-lg font-bold">Catalí</p>
            <p className="text-xs text-background/60">Cocina tradicional veracruzana</p>
          </div>
        </div>
        <p className="text-sm text-background/60">
          © {new Date().getFullYear()} Catalí · Hecho con sazón en Veracruz.
        </p>
      </div>
    </footer>
  );
}
