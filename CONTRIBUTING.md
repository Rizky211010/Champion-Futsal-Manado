# 🤝 Panduan Kontribusi - Champion Futsal

Terima kasih telah tertarik untuk berkontribusi pada project Champion Futsal! Dokumen ini menjelaskan cara berkontribusi dengan benar.

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Sebelum Mulai](#sebelum-mulai)
- [Proses Kontribusi](#proses-kontribusi)
- [Guidelines](#guidelines)
- [Commit Message](#commit-message)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

Dengan berpartisipasi dalam project ini, Anda setuju untuk:

- Bersikap hormat dan inklusif
- Tidak melakukan pelecehan atau diskriminasi
- Memberikan kritik yang konstruktif
- Fokus pada project dan bukan pada personal

---

## 🚀 Sebelum Mulai

### Setup Environment

```bash
# 1. Fork repository
# Kunjungi https://github.com/rizkymema/champion-futsal dan klik Fork

# 2. Clone fork Anda
git clone https://github.com/YOUR_USERNAME/champion-futsal.git
cd champion-futsal

# 3. Add upstream remote
git remote add upstream https://github.com/rizkymema/champion-futsal.git

# 4. Install dependencies
npm install

# 5. Buat branch baru
git checkout -b feature/your-feature-name
```

### Tools yang Diperlukan

- Node.js 18+
- npm atau yarn
- Git
- Text Editor (VS Code recommended)

---

## 🔄 Proses Kontribusi

### 1. Cari Issue atau Buat Feature Request

- Lihat [Issues](https://github.com/rizkymema/champion-futsal/issues) untuk bug yang perlu diperbaiki
- Atau buat issue baru untuk feature yang ingin ditambahkan
- Diskusikan dengan maintainer sebelum mulai coding

### 2. Fork & Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/champion-futsal.git
cd champion-futsal
```

### 3. Buat Branch Fitur

```bash
# Update main branch terlebih dahulu
git checkout main
git pull upstream main

# Buat branch baru
git checkout -b feature/your-feature-name
```

### 4. Implementasi Fitur

- Ikuti guidelines di bawah
- Write clean, readable code
- Tambahkan comments jika diperlukan
- Test code Anda secara manual

### 5. Commit & Push

```bash
# Stage changes
git add .

# Commit dengan pesan yang jelas
git commit -m "feat: add description of your feature"

# Push ke fork Anda
git push origin feature/your-feature-name
```

### 6. Buat Pull Request

- Kunjungi repository original di GitHub
- Klik "New Pull Request"
- Pilih branch Anda
- Jelaskan perubahan dengan detail
- Submit PR

### 7. Review & Merge

- Tunggu review dari maintainer
- Respond terhadap feedback
- Setelah approved, PR akan di-merge

---

## 📝 Guidelines

### Code Style

```typescript
// ✅ GOOD
function calculatePrice(price: number, tax: number): number {
  return price + (price * tax / 100);
}

const handleBooking = async (fieldId: string) => {
  try {
    const response = await fetch(`/api/bookings`, {
      method: 'POST',
      body: JSON.stringify({ fieldId }),
    });
    return response.json();
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
};

// ❌ AVOID
function calcPrice(p, t) {
  return p + p * t / 100;
}

const booking = async (id) => {
  const r = await fetch(`/api/bookings`, { method: 'POST', body: JSON.stringify({ id }) });
  return r.json();
};
```

### Naming Conventions

```typescript
// Components: PascalCase
// components/BookingModal.tsx
export function BookingModal() {}

// Functions: camelCase
// lib/utils.ts
export function formatCurrency(amount: number): string {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_TIMEOUT = 5000;

// Files: kebab-case
// components/field-card.tsx
// hooks/use-booking.ts
```

### Folder Structure

```
Letakkan file di folder yang tepat:
- /components - React components
- /app - Next.js pages
- /lib - Utility functions
- /hooks - Custom hooks
- /types - TypeScript types
- /store - State management
```

### TypeScript

```typescript
// ✅ Always use explicit types
interface BookingData {
  fieldId: string;
  date: Date;
  time: string;
  customerName: string;
}

function createBooking(data: BookingData): Promise<Booking> {
  // implementation
}

// ❌ Avoid implicit types
function createBooking(data: any): any {
  // implementation
}
```

---

## 💬 Commit Message

Format commit message dengan jelas:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: Feature baru
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc
- `refactor`: Refactoring code
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process, dependencies, etc

### Contoh

```
feat(booking): add date picker to booking modal

- Implement date picker component
- Add validation for past dates
- Add tests for date picker

Closes #123
```

---

## 📤 Pull Request Process

### PR Title

```
feat: Add date picker to booking modal
fix: Fix alignment issue in footer
docs: Update installation guide
```

### PR Description

```markdown
## Description
Jelaskan apa yang diubah dan mengapa.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Jelaskan bagaimana Anda test perubahan ini.

## Screenshots (if applicable)
Tambahkan screenshot jika ada UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review done
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Added tests if applicable
- [ ] All tests pass locally
```

---

## 🧪 Testing

Sebelum submit PR, pastikan:

```bash
# Run linter
npm run lint

# Run type check
npm run type-check

# Build production
npm run build

# Manual testing
npm run dev
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🆘 Need Help?

- Buka Discussion di GitHub
- Email: info@championfutsal.com
- WhatsApp: (0431) 833999

---

## 🎉 Terima Kasih!

Kontribusi Anda sangat berarti bagi project ini. Semoga menyenangkan berkontribusi! 🚀
