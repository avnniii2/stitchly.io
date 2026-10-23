import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  KeyRound, 
  RotateCcw, 
  ShieldCheck, 
  User, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage = () => {
  const { startLogin, confirmOtp, quickLogin, isLoading, authError, clearError, pendingLogin, cancelPendingLogin } = useAuth();
  const { addToast } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('priya@example.com');
  const [password, setPassword] = useState('customer123');
  const [fieldErrors, setFieldErrors] = useState({});

  // 6-box OTP state
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const otpInputRefs = useRef([]);

  const fromPath = location.state?.from?.pathname;

  const getRedirectPath = (role) => {
    if (fromPath) return fromPath;
    if (role === 'admin') return '/admin';
    if (role === 'tailor') return '/tailor';
    return '/app';
  };

  // Timer countdown for OTP
  useEffect(() => {
    let interval = null;
    if (pendingLogin && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pendingLogin, resendTimer]);

  // Autofocus first OTP box when entering OTP step
  useEffect(() => {
    if (pendingLogin && otpInputRefs.current[0]) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [pendingLogin]);

  const validateCredentials = () => {
    const errors = {};
    if (!identifier.trim()) {
      errors.identifier = 'Please enter your email or registered phone number';
    }
    if (!password) {
      errors.password = 'Please enter your password';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validateCredentials()) return;

    try {
      await startLogin({ identifier, password });
      setResendTimer(30);
      setOtpValues(['', '', '', '', '', '']);
      addToast({
        title: 'OTP Dispatched',
        message: 'Enter code 123456 to verify your atelier session',
        type: 'stitch'
      });
    } catch (err) {
      // Error handled in store
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newValues = [...otpValues];
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i];
    }
    setOtpValues(newValues);
    const nextIdx = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIdx]?.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpValues.join('');
    if (code.length < 6) {
      setFieldErrors({ otp: 'Please enter all 6 digits of the OTP' });
      return;
    }

    try {
      const user = await confirmOtp(code);
      addToast({
        title: `Welcome back, ${user.name.split(' ')[0]}!`,
        message: `Signed in as ${user.role} atelier pass.`,
        type: 'success'
      });
      navigate(getRedirectPath(user.role), { replace: true });
    } catch (err) {
      // Handled in store
    }
  };

  const handleQuickLogin = async (role) => {
    try {
      const user = await quickLogin(role);
      addToast({
        title: `Signed in as Demo ${role.toUpperCase()}`,
        message: `Welcome, ${user.name}!`,
        type: 'success'
      });
      navigate(getRedirectPath(user.role), { replace: true });
    } catch (err) {
      addToast({
        title: 'Login Error',
        message: err.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream atelier-grain flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
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
            Welcome to the Atelier
          </h2>
          <p className="text-sm text-plum-soft mt-1">
            Sign in to check pattern progress, chat with tailors, or manage orders
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <Card variant="glass" className="p-4 border-dashed border-rose-deep/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-deep flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              One-Click Demo Logins
            </span>
            <span className="text-[10px] text-plum-soft">Skip manual credentials</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              disabled={isLoading}
              className="px-2.5 py-2 rounded-xl bg-blush/60 hover:bg-blush text-plum text-xs font-semibold text-center border border-blush/90 shadow-xs transition-transform active:scale-95"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('tailor')}
              disabled={isLoading}
              className="px-2.5 py-2 rounded-xl bg-mint/60 hover:bg-mint text-emerald-950 text-xs font-semibold text-center border border-mint shadow-xs transition-transform active:scale-95"
            >
              Demo Tailor
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              disabled={isLoading}
              className="px-2.5 py-2 rounded-xl bg-sky/60 hover:bg-sky text-blue-950 text-xs font-semibold text-center border border-sky shadow-xs transition-transform active:scale-95"
            >
              Demo Admin
            </button>
          </div>
        </Card>

        {/* Main Auth Form Card */}
        <Card variant="glass" className="p-6 md:p-8 relative">
          <AnimatePresence mode="wait">
            {!pendingLogin ? (
              /* Step 1: Credentials Form */
              <motion.form
                key="credentials-form"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleCredentialsSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-1.5">
                    Email or Phone Number
                  </label>
                  <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. priya@example.com or +91 9876543210"
                      className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-plum placeholder-plum-soft/60 focus:outline-none"
                    />
                  </div>
                  {fieldErrors.identifier && (
                    <p className="text-xs text-rose-deep mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.identifier}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum">
                      Password
                    </label>
                    <span className="text-[11px] text-plum-soft">
                      (Demo default: <code className="bg-cream-200 px-1 rounded">customer123</code>)
                    </span>
                  </div>
                  <div className="relative thread-input rounded-2xl border border-plum/20 bg-white/80 overflow-hidden">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
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

                {authError && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-blush text-xs text-rose-deep flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full py-3 text-sm font-semibold"
                >
                  Continue with OTP
                </Button>
              </motion.form>
            ) : (
              /* Step 2: 6-Box OTP Form */
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-butter/60 border border-amber-300 mx-auto flex items-center justify-center mb-2">
                    <KeyRound className="w-6 h-6 text-amber-800" />
                  </div>
                  <h3 className="font-fraunces text-xl text-plum">
                    Verify Atelier Code
                  </h3>
                  <p className="text-xs text-plum-soft mt-1">
                    Enter the 6-digit confirmation code sent to{' '}
                    <strong className="text-plum">{pendingLogin.identifier}</strong>
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 border border-mint text-[11px] text-emerald-900 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Demo Bypass: Use code 123456</span>
                  </div>
                </div>

                {/* 6 Box Inputs */}
                <div className="flex justify-between gap-2 on-paste-handler" onPaste={handleOtpPaste}>
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 text-center text-xl font-bold font-mono rounded-xl bg-white border border-plum/20 text-plum focus:outline-none focus:ring-2 focus:ring-rose-deep focus:border-rose-deep shadow-sm transition-all"
                    />
                  ))}
                </div>

                {fieldErrors.otp && (
                  <p className="text-xs text-rose-deep text-center">{fieldErrors.otp}</p>
                )}

                {authError && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-blush text-xs text-rose-deep flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  icon={ShieldCheck}
                  className="w-full py-3 font-semibold"
                >
                  Verify & Enter Atelier
                </Button>

                {/* Resend Timer & Back action */}
                <div className="flex items-center justify-between text-xs text-plum-soft pt-1">
                  <button
                    type="button"
                    onClick={cancelPendingLogin}
                    className="hover:text-plum underline"
                  >
                    Change credentials
                  </button>

                  <div>
                    {resendTimer > 0 ? (
                      <span>Resend code in <strong className="text-plum font-mono">{resendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setResendTimer(30);
                          addToast({
                            title: 'Code Resent',
                            message: 'Use 123456 to verify',
                            type: 'info'
                          });
                        }}
                        className="text-rose-deep font-semibold hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

        {/* Signup Redirect */}
        <p className="text-center text-xs text-plum-soft">
          Don't have an atelier account yet?{' '}
          <Link to="/signup" className="font-semibold text-rose-deep hover:underline">
            Create an outfit profile
          </Link>
        </p>
      </div>
    </div>
  );
};
