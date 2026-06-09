import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialButtons() {
  const socials = [
    {
      icon: <FaInstagram />,
      link: "https://instagram.com/yourusername",
      color: "text-pink-600",
    },
    {
      icon: <FaWhatsapp />,
      link: "https://wa.me/919601172832",
      color: "text-green-500",
    },
    {
      icon: <FaFacebookF />,
      link: "https://facebook.com/yourpage",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="fixed right-6 bottom-8 z-[999] flex flex-col gap-4">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-16 h-16
            rounded-full
            flex items-center justify-center
            text-3xl
            bg-white/95
            border-4 border-white
            shadow-[0_8px_25px_rgba(0,0,0,0.18)]
            backdrop-blur-md
            transition-all duration-300
            hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
            ${social.color}
          `}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
}