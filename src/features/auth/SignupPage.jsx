import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Scissors, 
  FileUp, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SignupPage = () => {
  const { signup, isLoading, authError, clearError } = useAuth();
  const { addToast } = useUI();
  const navigate = useNavigate();

  const [role, setRole] = useState('customer'); // 'customer' or 'tailor'
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    city: 'Jaipur',
    specialty: 'Bridal Lehengas & Zardozi',
  });
  const [kycFile, setKycFile] = useState(null);
  const [kycBase64, setKycBase64] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setKycFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setKycBase64(reader.result);
      addToast({
        title: 'Document Uploaded',
        message: `${file.name} ready for workshop verification`,
        type: 'stitch'
      });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.emailOrPhone.trim()) errs.emailOrPhone = 'Email address or mobile number is required';
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (role === 'tailor') {
      if (!formData.city.trim()) errs.city = 'Operating city is required for tailor match';
      if (!formData.specialty.trim()) errs.specialty = 'Specialty must be selected';
      if (!kycBase64) errs.kyc = 'Please upload a shop registration, Aadhaar, or craft certificate';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      const user = await signup({
        name: formData.name,
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        role,
        city: formData.city,
        specialty: formData.specialty,
        kycDocument: kycBase64
      });

      addToast({
        title: 'Welcome to Stitchly!',
        message: role === 'tailor' 
          ? 'Tailor application submitted! Under review.' 
          : 'Customer atelier account created successfully.',
        type: 'success'
      });

      navigate('/onboarding', { replace: true });
    } catch (err) {
      // Error in store
    }
  };

  return (
    <div className="min-h-screen bg-cream atelier-grain flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-blush flex items-center justify-center shadow-soft border border-blush/80 group-hover:scale-105 transition-transform">
              <NeedleIcon className="w-6 h-6 -rotate-12" color="#D9718A" />
            </div>
            <span className="font-fraunces text-3xl font-semibold text-plum">
              Stitchly
            </span>
          </Link>

          <h2 className="font-fraunces text-2xl md:text-3xl text-plum mt-4">
            Begin Your Custom Journey
          </h2>
          <p className="text-sm text-plum-soft mt-1">
            Pick your atelier role to get matched with personalized tools
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Choice: Two Large Illustrated Pastel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Card */}
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole('customer')}
              className={`cursor-pointer rounded-3xl p-5 border-2 transition-all relative overflow-hidden ${
                role === 'customer'
                  ? 'bg-blush/30 border-rose-deep shadow-soft-blush'
                  : 'bg-white/80 border-plum/10 hover:border-blush'
              }`}
            >
              {role === 'customer' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rose-deep text-white flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="w-12 h-12 rounded-2xl bg-blush flex items-center justify-center mb-3">
                <NeedleIcon className="w-6 h-6" color="#D9718A" />
              </div>
              <h3 className="font-fraunces text-lg text-plum font-semibold">
                I Want Custom Outfits
              </h3>
              <p className="text-xs text-plum-soft mt-1 leading-relaxed">
                Design with AI, select fabrics, book doorstep measurement kit, and track your artisan live.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-deep">
                <span>Customer Atelier</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>

            {/* Tailor Card */}
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole('tailor')}
              className={`cursor-pointer rounded-3xl p-5 border-2 transition-all relative overflow-hidden ${
                role === 'tailor'
                  ? 'bg-mint/30 border-emerald-600 shadow-soft-mint'
                  : 'bg-white/80 border-plum/10 hover:border-mint'
              }`}
            >
              {role === 'tailor' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center mb-3">
                <ScissorsIcon className="w-6 h-6" color="#2E8B57" />
              </div>
              <h3 className="font-fraunces text-lg text-plum font-semibold">
                I Am a Master Tailor
              </h3>
              <p className="text-xs text-plum-soft mt-1 leading-relaxed">
                Receive high-value wedding orders, showcase your craft heritage, and get paid guaranteed rates.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                <span>Artisan Atelier</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          </div>

          {/* Form Fields Card */}
          <Card variant="glass" className="p-6 md:p-8 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                Full Name {role === 'tailor' && 'or Studio Name'}
              </label>
              <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={role === 'tailor' ? 'e.g. Master Farooq or Royal Boutique' : 'e.g. Meera Singhania'}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum placeholder-plum-soft/60 focus:outline-none"
                />
              </div>
              {fieldErrors.name && (
                <p className="text-xs text-rose-deep mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                Email Address or Phone
              </label>
              <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  placeholder="e.g. meera@domain.com or +91 98200 12345"
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum placeholder-plum-soft/60 focus:outline-none"
                />
              </div>
              {fieldErrors.emailOrPhone && (
                <p className="text-xs text-rose-deep mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.emailOrPhone}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                Create Secure Password
              </label>
              <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum placeholder-plum-soft/60 focus:outline-none"
                />
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-rose-deep mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Tailor Specific Fields: City, Specialty, and KYC Upload */}
            <AnimatePresence>
              {role === 'tailor' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-2 border-t border-plum/10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                        Operating City
                      </label>
                      <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum focus:outline-none"
                        >
                          <option value="Jaipur">Jaipur (Pink City)</option>
                          <option value="Delhi">Delhi NCR</option>
                          <option value="Lucknow">Lucknow (Awadh)</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Varanasi">Varanasi</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Chennai">Chennai</option>
                        </select>
                      </div>
                    </div>

                    {/* Specialty */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                        Primary Craft Specialty
                      </label>
                      <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                        <Scissors className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum focus:outline-none"
                        >
                          <option value="Bridal Lehengas & Zardozi">Bridal Lehengas & Zardozi</option>
                          <option value="Kanjeevaram Silk Blouses & Aari Work">Kanjeevaram Silk Blouses & Aari Work</option>
                          <option value="Chikankari & Bandhgala Sherwanis">Chikankari & Bandhgala Sherwanis</option>
                          <option value="Contemporary Fusion & Cape Anarkalis">Contemporary Fusion & Cape Anarkalis</option>
                          <option value="Banarasi Brocades & Kurtas">Banarasi Brocades & Kurtas</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* KYC Document Upload (Stored as Base64 in Mock DB with status=pending) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                      Upload Workshop KYC / ID Document
                    </label>
                    <div className="border-2 border-dashed border-mint-400 bg-mint/10 rounded-2xl p-4 text-center hover:bg-mint/20 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-1.5">
                        <FileUp className="w-6 h-6 text-emerald-700" />
                        <span className="text-xs font-semibold text-plum">
                          {kycFile ? kycFile.name : 'Upload Shop License, Aadhaar, or Craft Certificate'}
                        </span>
                        <span className="text-[10px] text-plum-soft">
                          PNG, JPG, or PDF up to 5MB (Saved as base64 in atelier DB)
                        </span>
                      </div>
                    </div>
                    {fieldErrors.kyc && (
                      <p className="text-xs text-rose-deep mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.kyc}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {authError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-blush text-xs text-rose-deep flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant={role === 'tailor' ? 'mint' : 'primary'}
              size="lg"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full py-3.5 font-semibold text-base mt-2"
            >
              {role === 'tailor' ? 'Submit Tailor Application' : 'Create My Outfit Profile'}
            </Button>
          </Card>
        </form>

        <p className="text-center text-xs text-plum-soft">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-rose-deep hover:underline">
            Log in to your Atelier
          </Link>
        </p>
      </div>
    </div>
  );
};
