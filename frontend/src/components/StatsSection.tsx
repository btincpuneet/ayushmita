
// import React from "react";
// import { Heart, Building2, Beaker, Stethoscope } from "lucide-react";
// import Container from "./Container";

// const stats = [
//   {
//     icon: Heart,
//     count: "5000+",
//     label: "Happy Patients",
//     bg: "bg-blue-50",
//     iconColor: "text-blue-500",
//   },
//   {
//     icon: Building2,
//     count: "200+",
//     label: "Hospitals",
//     bg: "bg-rose-50",
//     iconColor: "text-rose-500",
//   },
//   {
//     icon: Beaker,
//     count: "1000+",
//     label: "Laboratories",
//     bg: "bg-amber-50",
//     iconColor: "text-amber-500",
//   },
//   {
//     icon: Stethoscope,
//     count: "700+",
//     label: "Expert Doctors",
//     bg: "bg-emerald-50",
//     iconColor: "text-emerald-500",
//   },
// ];

// export const StatsSection: React.FC = () => {
//   return (
//     <section className="bg-[#F8EFBC80]">
//       <div className="relative w-full max-w-6xl mx-auto px-4 pb-12 md:pb-16 lg:py-20 hospital-slider">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* ---------------------- */}
//           {/* Left Text Content     */}
//           {/* ---------------------- */}
//           <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left px-4 lg:px-0 headings-family">
//             <h2 style={{
//               fontFamily: 'Ubuntu',
//               fontWeight: 700,          // Bold
//               fontStyle: 'normal',      // Bold is handled via fontWeight
//               fontSize: '32px',
//               lineHeight: '67px',
//               letterSpacing: '0%',
//               verticalAlign: 'middle',
//               color: '#111827',          // Tailwind text-gray-900
//               // leading-trim: NONE is not standard CSS, so it's ignored
//             }}>
//               Our Families
//             </h2>
//             <p className="mt-4 leading-relaxed"
//               style={{
//                 fontFamily: 'Inter',
//                 fontWeight: 500,          
//                 fontStyle: 'normal',      
//                 fontSize: '17px',
//                 lineHeight: '28px',
//                 letterSpacing: '0%',
//                 verticalAlign: 'middle',
//                 color: '#4B5563',          
//               }}>
//               We will work with you to develop individualised care plans,
//               including management of chronic diseases. If we cannot assist, we
//               can provide referrals or advice about the type of practitioner
//               you require. We treat all enquiries sensitively and in the
//               strictest confidence.
//             </p>
//           </div>

//           {/* ---------------------- */}
//           {/* Right Stats Cards     */}
//           {/* ---------------------- */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-0 cards-icons-section">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               const stagger = index === 1 || index === 3 ? "md:translate-y-6" : "";

//               return (
//                 <div
//                   key={stat.label}
//                   className={`${stagger} w-full h-[304px] mx-auto bg-white rounded-sm
// shadow-[0_10px_30px_rgba(15,23,42,0.06)]
// flex flex-col items-center justify-center text-center gap-4
// transition-all duration-300 ease-out
// hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]
// `}
//                 >
//                   {/* Icon Circle */}
//                   <div
//                     className={`${stat.bg} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center`}
//                   >
//                     <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.iconColor}`} />
//                   </div>

//                   {/* Text Content */}
//                   <div>
//                     <div className="count-familiess"
//                       style={{
//                         fontFamily: 'Ubuntu',
//                         fontWeight: 700,     
//                         fontStyle: 'normal', 
//                         fontSize: '48px',
//                         lineHeight: '48px',
//                         letterSpacing: '0%',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                       }}>
//                       {stat.count}
//                     </div>
//                     <div className="mt-1"
//                       style={{
//                         fontFamily: 'Ubuntu',
//                         fontWeight: 500,         
//                         fontStyle: 'normal',     
//                         fontSize: '18px',
//                         lineHeight: '28px',
//                         letterSpacing: '0%',
//                         textAlign: 'center',
//                         verticalAlign: 'middle',
//                         // leading-trim: NONE is not standard CSS, so it's ignored
//                       }}>
//                       {stat.label}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/aboutUs.css";
import "../css/footer.css";
import { API_BASE } from "../config/api";

interface CmsPageData {
  id?: number;
  title: string;
  slug?: string;
  content_html: string;
  status?: string;
}

const StatsSection: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const [page, setPage] = useState<CmsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);

        const endpoint = slug
          ? `${API_BASE}/api/pages/${slug}`
          : `${API_BASE}/api/pages/family-stats`;

        const res = await axios.get<{ data: CmsPageData }>(endpoint);

        setPage(res.data.data);
      } catch (error) {
        console.error("Failed to load CMS page:", error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading page...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Page not found
      </div>
    );
  }

  return (
    <section>
      <div
        className="cms-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content_html }}
      />
    </section>
  );
};

export default StatsSection;
