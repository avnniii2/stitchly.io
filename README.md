# Stitchly — Designed by you, stitched by experts

> **Atelier Tagline:** Designed by you, stitched by experts.  
> **One-liner:** A two-sided online marketplace where customers create custom outfits with AI, customize them, pick a matched independent tailor, and track the order live until delivery, with zero shop visits.  
> **Focus:** Indian ethnic, bridal, and festive wear; group wedding orders; regional-language voice input.  
> **Role Architectures:** Customer, Tailor, Admin. (AI Studio and Courier Partner as system actors).

---

## Exact Project Folder Path

```
C:\Users\DEVVANSH GUPTA\.gemini\antigravity-ide\scratch\stitchly
```

### Exact Command to Open in VS Code
```bash
code "C:\Users\DEVVANSH GUPTA\.gemini\antigravity-ide\scratch\stitchly"
```

### Exact Command to Run Locally
```bash
cmd.exe /c "npm run dev"
```
*Application runs at:* `http://localhost:5173`

### Production Build Command
```bash
cmd.exe /c "npm run build"
```
*Build output:* Clean production bundle in `/dist` (`✓ built in 14.78s`, 0 errors).

---

## Technology Stack

- **Core & Framework:** React 18 + Vite
- **Routing:** React Router v6 (Data Router with Role-Based Protected Routes & Layouts)
- **Styling:** Tailwind CSS with custom Atelier Design Tokens
- **Animations:** Framer Motion (`cubic-bezier(0.22, 1, 0.36, 1)`, soft fabric-like motion, reduced-motion aware)
- **State Management:** Zustand (`useAuth`, `useUI`, `useWishlist`)
- **Parametric Garment Renderer:** Pure SVG layered engine (`Garment.jsx`, `fabrics.jsx`, `embroidery.jsx`, `mannequin.jsx`)
- **Icons & Atelier Doodles:** Lucide React + Bespoke SVGs (Needles, Thread Spools, Scissors, Measuring Tapes, Chalk Underlines)
- **Analytics & Telemetry:** Recharts (Area, Line, and Bar charts for GMV, Tailor revenue, and delivery metrics)
- **Voice Recognition:** Web Speech API (`useVoice.js`) with regional Indian accents (`hi-IN`, `en-IN`, `ta-IN`, `bn-IN`, `mr-IN`) and simulation fallback
- **Cross-Tab Synchronization:** Reactive `localStorage` + `window.dispatchEvent(new Event('storage'))` event broadcasting
- **Deployment:** Vercel SPA Configuration (`vercel.json` SPA rewrite rule)

---

## Atelier Design System Tokens

Stitchly strictly avoids generic dark modes, harsh blacks, or neon aesthetics. Every screen is steeped in a dreamy, warm, pastel atelier identity:

| Token Name | Hex Code | Atelier Purpose |
| :--- | :--- | :--- |
| **Cream** | `#FFF9F5` | Primary canvas backdrop & warm muslin texture |
| **Blush** | `#F9D5DC` | Soft silk accents & Customer portal primary |
| **Lavender** | `#E4DAF6` | Organza shimmer & AI Studio glowing borders |
| **Mint** | `#D5EFE3` | Tailor Workshop theme & artisan verification badges |
| **Peach** | `#FFE2CF` | Warm swatch chips & measurement kit cards |
| **Butter** | `#FFF1B8` | Brass finials & measuring tape backgrounds |
| **Sky** | `#D8E8F8` | Admin Control Room theme & analytical calmness |
| **Plum** | `#4A3F5C` | Deep readable charcoal-plum typography (4.5:1+ contrast) |
| **Plum-Soft**| `#8A7F9C` | Secondary captions, timestamps, and subtle margins |
| **Rose-Deep**| `#D9718A` | Primary CTAs, active focus rings, and thread lines |

- **Typography:** `Fraunces` (Google Fonts variable optical serif) for headings + `Manrope` (Google Fonts geometric sans) for UI and inputs.

---

## Demo Credentials & One-Click Login

On `/login`, one-click demo login buttons are provided to instantly authenticate into any role:

| Persona | Name | Email | Password | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Priya Sharma | `priya@example.com` | `customer123` | Customer Atelier (`/app`) |
| **Tailor** | Master Rahmatullah Khan | `rahmatullah@atelier.stitchly.in` | `tailor123` | Tailor Workshop (`/tailor`) |
| **Admin** | Devanshi Shah | `admin@stitchly.in` | `admin123` | Control Room (`/admin`) |

*Demo OTP:* Any 6-digit code (e.g. `123456`) always verifies immediately.

---

## Complete Feature-to-Route Map

### 1. Public & Marketing (`PublicLayout`)
- `/` — **Landing Page**: 11 art-directed sections including Split Hero with 3.8s outfit morpher (`kurta` → `lehenga` → `blouse` → `sherwani`), live trust counters, 3-step timeline, regional voice preview, tailor discovery preview, fabric swatch showcase, doorstep fit guarantee, and footer.
- `/how-it-works` — Visual walkthrough of AI design generation, master tailor baste-fitting, and insured doorstep delivery.
- `/tailors` — Public directory of verified master karigars across Jaipur, Lucknow, Chennai, and Delhi.
- `/inspiration` — Community lookbook gallery with **"Recreate This Look in Studio ✨"** button that pre-populates AI Studio parameters.
- `/login` & `/signup` — Interactive authentication with 6-box OTP entry, tailor KYC document upload, and one-click demo switches.
- `/onboarding` — 3-step interactive setup with **Style Quiz** swipe cards for colors, occasions, and silhouette fits.

### 2. Customer Portal (`CustomerLayout` at `/app/*`)
- `/app` — **Customer Home**: Warm greeting, active order mini-timeline progress bar, continue design draft card, upcoming festival occasion countdown, and floating "New Design ✨" shortcut.
- `/app/studio` — **AI Design Studio**:
  - **Left Zone:** Glowing prompt box, 3 sample prompt chips, regional voice input with animated audio waveform, reference image dropzone, occasion pills, budget slider, and gender selectors.
  - **Center Zone:** Dress-form mannequin SVG canvas with parametric silhouette morphing, fabric sheen shaders, and embroidery layers.
  - **Right Zone:** Swatch picker (Silk, Velvet, Georgette, Banarasi, Cotton), custom hex picker, sleeve cut, neckline cut, embroidery level, dupatta toggle, Express Delivery (+25%), and Gift Mode toggle. Live count-up budget and timeline estimator.
  - **Generation Engine:** Needle-and-thread stitch loader ("Sketching silhouette...", "Picking fabrics...", "Adding embroidery...") producing 4 distinct design variation cards.
  - **AR Try-On Simulation:** `getUserMedia` camera modal with adjustable garment overlay silhouette and mannequin fallback.
- `/app/tailors` — **Smart Matchmaker**: Multi-factor matching percentage rings (e.g. `98% Match`), specialty tags, city, pricing, turnaround days, and modal to dispatch commission request.
- `/app/orders` — Master order list with status badges and quick view.
- `/app/orders/:id` — **Order Detail Workspace**:
  - 6-Stage live basting timeline (`Requested` → `Quote` → `Cutting` → `Stitching` → `QC` → `Dispatched` → `Delivered`).
  - Delhivery Surface Express live AWB tracking card.
  - Workshop photo stream uploaded by the tailor.
  - In-app live chat directly with the master craftsman.
  - 40% Advance / 60% Balance milestone payment sheet simulation (UPI, Card, EMI).
  - Star ratings & reviews modal.
  - 100% Free Doorstep Alteration claim flow.
- `/app/wishlist` — Saved custom design creations with one-click re-customization and tailor matchmaking.
- `/app/measurements` — **Doorstep Measurement Vault**: Multi-profiles (`Self`, `Spouse`, `Child`), unit toggle (`Inches` vs `Centimeters`), 14-point inputs, and illustrated measuring tip diagrams.
- `/app/group` — **Wedding Entourage Coordination**: Entourage member list (Bride, Groom, Bridesmaids), progress discount meter (up to 18% group savings), and shareable invite links.
- `/app/profile` — Client credentials, doorstep address manager, language switcher (`English` / `Hindi`), and Referral Club tracker (code sharing, ₹1,500 credits earned).

### 3. Tailor Workshop Portal (`TailorLayout` at `/tailor/*` — Mint Atelier Theme)
- `/tailor` — **Artisan Overview**: Monthly capacity counter (`4 / 6 Outfits`), allocated commission payouts (`₹18,500`), pending requests, and craft rating (`4.96 ★`).
- `/tailor/inbox` — **Booking Requests**: Custom customer design preview with parametric SVG render, client dimensions, and **Feasibility & Formal Quote Tool** (price input, turnaround days slider, artisan notes). Dispatches notification to customer.
- `/tailor/orders` — **Order Workflow Kanban**: Visual Kanban board across *Requested → Cutting → Stitching → QC → Ready → Dispatched*. Quick status advancement, client measurements sheet, progress photo publisher, and client chat tab.
- `/tailor/portfolio` — Handcrafted garment archive grid, tag filters, Bridal Specialist badge toggle, and "Upload Craft Piece" modal.
- `/tailor/pricing` — Base rate card for lehengas, kurtas, sherwanis, blouses; express rush order surcharge (+25%); monthly capacity limit slider; and blackout holiday calendar.
- `/tailor/dispatch` — Packaging checklist (steam pressing, latkan tassels, anti-humidity bag, certificate of craftsmanship), Delhivery mock AWB generator, and courier handoff trigger.
- `/tailor/earnings` — Financial dashboard with 12% Stitchly platform commission breakdown, net workshop payout, and weekly settlement history.
- `/tailor/analytics` — Recharts line chart for monthly payout trends, bar chart for bespoke outfits delivered, and 5-star customer review breakdown.
- `/tailor/kyc` — Workshop verification status, document viewer, and Digilocker integration status.

### 4. Admin Control Room (`AdminLayout` at `/admin/*` — Sky Theme)
- `/admin` — **Operations Control Room**: Monthly Atelier GMV (`₹38.4 Lakhs`), 184 active workshop commissions, 98.8% fit benchmark, and Recharts order flow synchronization graphs.
- `/admin/verification` — Tailor KYC review queue with document preview modal (Aadhaar, Workshop GST, Guild Card), approve and reject actions with custom rejection feedback.
- `/admin/disputes` — Mediation workspace with tape measure photo evidence viewer, and actions: Full Escrow Refund, Free Re-Stitch Authorization, or Claim Dismissal.
- `/admin/moderation` — Community audit queue for flagged customer reviews, artisan portfolio images, and inspiration posts.
- `/admin/catalog` — Directory of parametric garment silhouettes, fabric shader inventory, and base platform making rates.
- `/admin/users` — Master directory of all customers, tailors, and admins with role filtering and account suspend/reactivate toggles.

---

## Mock Backend & Cross-Tab Synchronization

All data is managed locally via `/src/services/*` backed by reactive `localStorage` stores:
- `orders.js`: Complete order lifecycle state machine, quote approval, milestone payment states, workshop photos, and messages.
- `tailors.js`: Tailor profiles, specialties, match scoring algorithms, ratings, and locations.
- `notifications.js`: Cross-role notification engine with unread badges and drawer previews.
- `storage.js`: User accounts and KYC credentials.
- `payments.js`: Milestone 40% advance and 60% balance escrow simulations.
- `courier.js`: Delhivery/Shiprocket tracking telemetry simulation.

### Cross-Tab Reactivity
Whenever an action occurs (e.g. customer submits booking request, tailor sends quote, tailor advances Kanban to *Stitching*, or admin verifies KYC), the service automatically dispatches a native `storage` event via `window.dispatchEvent(new Event('storage'))`. Open tabs in other windows update immediately without needing a page refresh!

---

## How AI Simulation Works & Adding Real API Keys

- **Default Simulation:** The AI Studio uses a built-in semantic keyword parser (`/src/services/ai.js`) that analyzes the user's prompt for garments, colors, fabrics, occasions, and embroidery styles. It returns 4 distinct variations (Direct Match, Opulent Cut, Contemporary Light, and Artisan Heritage) rendered using procedural SVGs.
- **Adding Real Image Generation:** To connect a live generative model (e.g. Gemini / Imagen / OpenAI):
  1. Add your key to `.env`:
     ```env
     VITE_AI_API_KEY=your_actual_api_key_here
     ```
  2. The service in `/src/services/ai.js` is pre-structured to detect `import.meta.env.VITE_AI_API_KEY`. If present, it attempts external API generation and gracefully falls back to the procedural SVG engine if offline or on rate limit.

*Note on Demonstrations:* Payment sheets, Delhivery courier tracking, Web Speech voice input, and AR Try-On camera overlays are safe, self-contained simulations designed for comprehensive offline presentation without requiring external hardware or real payment cards.

---

## 5-Minute End-to-End Demo Script (Exact Clicks)

Follow this exact sequence to demonstrate the complete cross-role value proposition:

### Step 1: Customer Journey (Design & Request)
1. Navigate to `http://localhost:5173/login`.
2. Click **"Quick Login as Customer"** (Priya Sharma).
3. On `/app`, observe the warm greeting, Diwali festival countdown banner, and active order progress bar.
4. Click **"AI Design Studio"** in the top navigation bar.
5. In the left panel, click the sample chip: `“pastel pink anarkali for mehendi”`.
6. Click **"Generate 4 Bespoke Designs ✨"**.
7. Watch the 2.5-second needle-and-thread stitch loader ("Sketching silhouette...", "Picking fabrics...").
8. 4 distinct design cards stagger in. Click **"Customize"** on any card.
9. In the right panel, select the **Micro-Velvet** swatch and note the dress-form mannequin SVG canvas dynamically morph texture and color with soft fabric sheen.
10. Click **"Find Master Tailor"** at the bottom right.
11. On `/app/tailors`, observe the smart match percentages (e.g. **98% Match** for Master Rahmatullah Khan).
12. Click **"Commission Atelier"** to open the request modal with your attached custom design specs, and click **"Send Commission Request"**.
13. Click **"My Orders"** -> Open order `#ST-8921` to inspect the 6-stage live basting timeline, Delhivery AWB tracking card, workshop progress photos, and chat box.
14. Navigate to **"Measurement Kit"** (`/app/measurements`) -> Switch between *Self*, *Spouse*, and *Child* profiles, and toggle between *Inches* and *Centimeters*.
15. Click **"Sign Out"** in the top-right header.

### Step 2: Tailor Journey (Quote, Kanban & Progress Photos)
1. On `/login`, click **"Quick Login as Tailor"** (Master Rahmatullah Khan).
2. On `/tailor`, observe the mint-themed workshop overview, active cutting capacity (`4 / 6 Outfits`), and earnings.
3. Click **"Booking Inbox"** (`/tailor/inbox`).
4. Select the incoming customer commission request. Inspect the customer's custom garment SVG render, verified body measurements, and notes.
5. In the **Feasibility & Formal Quote Tool**, enter `19500`, set turnaround to `12 Days`, and click **"Send Formal Quote & Specs"**.
6. Click **"Orders Kanban"** (`/tailor/orders`).
7. Drag or click **"Move to Stitching"** on the order card.
8. Click on the order card to open the **Artisan Workspace Modal**.
9. Switch to the **Workshop Photos** tab -> Select sample photo 2 ("Gold thread tension check on karchob frame") -> Click **"Publish Progress Snapshot"**.
10. Switch to the **Client Chat** tab -> Type a message: *"Namaste Priya ji! The zari border is basted onto the skirt"* -> Click **Send**.
11. Navigate to **"Dispatch (AWB)"** (`/tailor/dispatch`) -> Tick off the packaging checklist -> Click **"Handover to Courier Executive"**.
12. Click **"Analytics"** (`/tailor/analytics`) to view Recharts monthly revenue and orders delivered charts.
13. Click **"Sign Out"**.

### Step 3: Admin Journey (KYC Verification & Disputes)
1. On `/login`, click **"Quick Login as Admin"** (Devanshi Shah).
2. On `/admin`, inspect the Operations Control Room, GMV metrics (`₹38.4 Lakhs`), fit success rate (`98.8%`), and activity graph.
3. Click **"KYC Approvals"** (`/admin/verification`).
4. Select the pending tailor application (`Master Rahmatullah Khan`) -> Click **"View Documents"** to preview the Aadhaar and Master Craftsman Guild Certificate -> Click **"Confirm & Approve Artisan"**.
5. Click **"Disputes & Escrow"** (`/admin/disputes`) to review customer fit claims, view submitted tape measure comparison photos, and inspect the resolution actions (*Issue Escrow Refund*, *Authorize Free Re-Stitch*).
6. Click **"Garment & Fabric Catalog"** (`/admin/catalog`) to inspect platform base making rates and fabric inventory.
7. Click **"User Directory"** (`/admin/users`) to filter by Customer, Tailor, and Admin accounts and test the status toggle.

---

## Deployment to Vercel

1. Push this repository to GitHub or run via Vercel CLI:
   ```bash
   vercel
   ```
2. The included `vercel.json` provides the required single-page application routing rewrite:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
3. Build Settings on Vercel:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
