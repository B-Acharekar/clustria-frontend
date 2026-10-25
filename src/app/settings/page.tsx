"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { motion } from "framer-motion";
import SettingsInnerSidebar from "@/components/settings/SettingsInnerSidebar";

import SecurityOverview from "@/components/settings/SecurityOverview";
import ConnectedApps from "@/components/settings/ConnectedApps";
import PlanCard from "@/components/settings/PlanCard";
import ProfileCard from "@/components/settings/ProfileCard";
import NotificationsSettings from "@/components/settings/NotificationsSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import PaymentModal from "@/components/settings/PaymentModal";

export default function SettingsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "business">("pro");
  
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const securityRef = useRef<HTMLDivElement | null>(null);
  const planRef = useRef<HTMLDivElement | null>(null);
  const appsRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const preferencesRef = useRef<HTMLDivElement | null>(null);
  
  const sectionRefs = useMemo<Record<string, React.RefObject<HTMLDivElement | null>>>(
    () => ({
      profile: profileRef,
      security: securityRef,
      plan: planRef,
      apps: appsRef,
      notifications: notificationsRef,
      preferences: preferencesRef,
    }),
    []
  );
  
  const userPlan = {
    name: "Free",
    storageUsed: 2.3,
    storageTotal: 5,
    encryption: "AES-256",
    lastLogin: "2025-09-18 08:00",
    username: "john.doe",
    email: "john@example.com",
  };
  
  const [currentPlan, setCurrentPlan] = useState(userPlan);
  // smooth scroll
  const handleScrollTo = (section: string) => {
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  
  // active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    Object.keys(sectionRefs).forEach((key) => {
      const ref = sectionRefs[key].current;
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117] text-white">
      <motion.div
        className="sticky top-0 h-screen shrink-0"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      <div className="min-w-0 flex-1 flex overflow-hidden">
        <div className="sticky top-0 h-screen shrink-0">
          <SettingsInnerSidebar
            current={activeSection}
            onSelect={handleScrollTo}
            collapsed={collapsed}
          />
        </div>

        <motion.main
          className="min-w-0 flex-1 overflow-y-auto bg-[#0d1117] p-4 space-y-8 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <section ref={profileRef} id="profile">
            <ProfileCard />
          </section>

          <section ref={securityRef} id="security">
            <SecurityOverview />
          </section>

          <section ref={planRef} id="plan">
            <PlanCard
              name={currentPlan.name}
              onUpgrade={() => {
                setSelectedPlan("pro"); // or "business" if you have multiple options
                setShowPaymentModal(true);
                router.push(`/plan?selected=${currentPlan.name.toLowerCase()}`);
              }}
            />
          </section>

          <section ref={appsRef} id="apps">
            <ConnectedApps />
          </section>

          <section ref={notificationsRef} id="notifications">
            <NotificationsSettings />
          </section>

          <section ref={preferencesRef} id="preferences">
            <PreferencesSettings />
          </section>
          {showPaymentModal && (
            <PaymentModal
              planId={selectedPlan}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={(planName, storageLimit) => {
                setCurrentPlan(prev => ({
                  ...prev,
                  name: planName,
                  storageTotal: storageLimit,
                }));
                setShowPaymentModal(false);
              }}
            />
          )}

        </motion.main>
      </div>
    </div>
  );
}
