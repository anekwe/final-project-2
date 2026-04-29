import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Users, Bus, Home as HomeIcon, Monitor, Medal, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image / Slider pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://i.ibb.co/cSsHtvS9/p1.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-army-dark)]/90 to-[var(--color-army-base)]/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white mx-auto text-center flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Raising Future Leaders Through <span className="text-[var(--color-accent-pink)]">Standard Education</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Welcome to HopeXavier First Academy. Equipping the next generation with knowledge, character, and vision for global excellence.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/apply" 
                className="bg-[var(--color-accent-pink)] text-white hover:bg-white hover:text-[var(--color-army-dark)] px-8 py-4 rounded-md font-bold text-lg uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-lg flex items-center"
              >
                Apply Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <a 
                href="#contact" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[var(--color-accent-pink)] px-8 py-4 rounded-md font-bold text-lg uppercase tracking-wide transition-all flex items-center transform hover:-translate-y-1 shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('https://i.ibb.co/mrtDMPDF/p2.png')", backgroundSize: "auto 80%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-[var(--color-accent-pink)] font-bold tracking-widest uppercase mb-2">About Us</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-army-dark)] leading-tight">
                  Excellence in Heritage, Innovation in Future
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                HopeXavier First Academy was established with a singular vision: to redefine educational standards in the Guita Community and beyond. Our history is rooted in a passion for nurturing well-rounded individuals capable of driving societal transformation.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="text-xl font-bold text-[var(--color-army-dark)] mb-3 flex items-center">
                    <Medal className="text-[var(--color-accent-pink)] mr-2" /> Mission
                  </h4>
                  <p className="text-gray-600">To deliver standard, accessible education that fosters intellectual, moral, and social growth.</p>
                </div>
                <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="text-xl font-bold text-[var(--color-army-dark)] mb-3 flex items-center">
                    <BookOpen className="text-[var(--color-accent-pink)] mr-2" /> Vision
                  </h4>
                  <p className="text-gray-600">To be a globally recognized institution raising leaders of profound character and intellect.</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[var(--color-army-dark)] mb-4">Core Values</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {['Integrity', 'Excellence', 'Discipline', 'Innovation', 'Respect', 'Leadership'].map((value, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                      <CheckCircle2 className="text-[var(--color-accent-pink)] mr-2" size={18} /> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://i.ibb.co/8D7sPvdw/d3.jpg" alt="Students studying" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                <img src="https://i.ibb.co/SwrhHp71/p3.png" alt="Classroom" className="rounded-2xl shadow-xl w-full h-64 object-cover mt-12" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[var(--color-army-dark)] text-white p-8 rounded-2xl shadow-2xl hidden md:block">
                <div className="text-4xl font-bold text-[var(--color-accent-pink)] mb-1">10+</div>
                <div className="text-sm uppercase tracking-wider font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#f4f6f5] relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('https://i.ibb.co/mrtDMPDF/p2.png')", backgroundSize: "auto 60%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-[var(--color-accent-pink)] font-bold tracking-widest uppercase mb-2">Our Services</h3>
            <h2 className="text-4xl font-bold text-[var(--color-army-dark)]">Comprehensive Educational Offerings</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <GraduationCap size={32} />, title: 'Junior Secondary', desc: 'Foundational years emphasizing cognitive and practical skills development.' },
              { icon: <BookOpen size={32} />, title: 'Senior Secondary', desc: 'Advanced curriculum preparing students for tertiary education and beyond.' },
              { icon: <Monitor size={32} />, title: 'ICT/STEM Lab', desc: 'State-of-the-art laboratories to foster technological innovation and science research.' },
              { icon: <Users size={32} />, title: 'Character Development', desc: 'Holistic approach integrating moral education and ethical leadership.' },
              { icon: <Bus size={32} />, title: 'School Bus Service', desc: 'Safe, reliable, and comfortable transportation across Bwarri and environs.' },
              { icon: <HomeIcon size={32} />, title: 'Hostel Facilities', desc: 'Secure, conducive boarding facilities that feel like a home away from home.' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#f4f6f5] rounded-xl flex items-center justify-center text-[var(--color-army-light)] mb-6 group-hover:bg-[var(--color-accent-pink)] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-army-dark)] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-army-dark)] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-pink)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
             <div className="relative z-10 md:w-2/3 mb-6 md:mb-0">
               <h3 className="text-3xl font-bold text-white mb-2">Specialized WAEC/NECO Preparation</h3>
               <p className="text-gray-300 text-lg">Intensive coaching and mock examinations to guarantee outstanding academic success.</p>
             </div>
             <div className="relative z-10">
               <Link to="/apply" className="bg-[var(--color-accent-pink)] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-pink-600 transition-colors shadow-lg">
                 Enroll Now
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 4. NEWS & BLOG SECTION (Preview) */}
      <section id="news" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-[var(--color-accent-pink)] font-bold tracking-widest uppercase mb-2">Latest Updates</h3>
              <h2 className="text-4xl font-bold text-[var(--color-army-dark)]">News & Blog</h2>
            </div>
            <a href="#" className="hidden sm:flex text-[var(--color-army-light)] font-bold hover:text-[var(--color-accent-pink)] transition-colors items-center">
              View All Posts <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Resumption Date for 2026/2027 Academic Session", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop", cat: "Announcement" },
              { title: "HopeXavier First Academy Wins Inter-School Debate", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop", cat: "News" },
              { title: "The Importance of STEM Education in Modern World", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop", cat: "Blog" }
            ].map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-sm border border-gray-100">
                  <img src={post.image} alt={post.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-sm text-[var(--color-accent-pink)] font-bold uppercase tracking-wide mb-2">{post.cat}</div>
                <h3 className="text-xl font-bold text-[var(--color-army-dark)] group-hover:text-[var(--color-army-light)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-[var(--color-army-dark)] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-[var(--color-accent-pink)] font-bold tracking-widest uppercase mb-2">Testimonials</h3>
            <h2 className="text-4xl font-bold">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The transformation in my son since joining HopeXavier has been remarkable. His confidence and academic performance have skyrocketed.", author: "Mr. Adeyemi O.", role: "Parent" },
              { text: "The STEM facilities here are unmatched in the region. I feel fully prepared for my university degree in Engineering.", author: "Sarah M.", role: "Student / Prefect" },
              { text: "Beyond academics, HopeXavier truly focuses on character development. It's a safe haven that instills discipline and leadership.", author: "Mrs. Nwachukwu", role: "Parent" },
            ].map((testimony, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-[var(--color-accent-pink)] mb-6 text-4xl leading-none">"</div>
                <p className="text-gray-300 text-lg mb-8 italic">"{testimony.text}"</p>
                <div>
                  <h4 className="font-bold text-white tracking-wide">{testimony.author}</h4>
                  <p className="text-[var(--color-accent-pink)] text-sm">{testimony.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT US SECTION */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-[var(--color-accent-pink)] font-bold tracking-widest uppercase mb-2">Contact Us</h3>
              <h2 className="text-4xl font-bold text-[var(--color-army-dark)] mb-8">Get In Touch With Us</h2>
              <p className="text-gray-600 mb-10">Have questions about admissions, facilities, or our curriculum? Our administrative team is ready to assist you.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[var(--color-army-light)] mr-4 shrink-0">
                    <HomeIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-army-dark)]">Visit Us</h4>
                    <p className="text-gray-600">Guita Community, Bwarri Area Council.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[var(--color-army-light)] mr-4 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-army-dark)]">Call Us</h4>
                    <p className="text-gray-600">08036987095, 08164724449</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[var(--color-army-light)] mr-4 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-army-dark)]">Email Us</h4>
                    <p className="text-gray-600">hopexavierfirstacademy@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100">
              <h3 className="text-2xl font-bold text-[var(--color-army-dark)] mb-6">Send us a Message</h3>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); }}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-light)]" placeholder="John" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-light)]" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-light)]" placeholder="example@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-light)] resize-none" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="w-full bg-[var(--color-army-dark)] hover:bg-[var(--color-army-base)] text-white font-bold py-4 rounded-lg transition-colors uppercase tracking-wide">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
