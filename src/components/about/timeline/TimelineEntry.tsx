import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { TimelineNode } from "./TimelineNode";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TimelineEntryProps {
  entry: {
    year: string;
    title: string;
    role?: string;
    description: string;
    skills?: string[];
    image?: string;
    imageAlt?: string;
    gallery?: string;
  };
  index: number;
}

export const TimelineEntry = ({ entry, index }: TimelineEntryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-8 ${
        index % 2 === 0 ? "md:flex-row flex-row" : "md:flex-row-reverse flex-row"
      } relative`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <motion.div 
            className={`flex-1 group cursor-pointer p-6 rounded-lg
                       bg-cosmic-darker/50 backdrop-blur-sm border border-cosmic-accent/10
                       hover:border-cosmic-accent/30 transition-all duration-300
                       ${index % 2 === 0 ? "md:text-right text-left" : "text-left"}`}
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="flex items-center gap-4 mb-4"
              style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
            >
              <Calendar className="w-5 h-5 text-cosmic-accent animate-pulse" />
              <div>
                <h4 className="text-xl md:text-2xl font-cinzel bg-gradient-to-r from-cosmic-accent to-cosmic-purple bg-clip-text text-transparent">
                  {entry.title}
                </h4>
                {entry.role && (
                  <p className="text-sm text-cosmic-light/70 mt-1">{entry.role}</p>
                )}
              </div>
            </div>
            
            {entry.image && (
              <div className="mb-4">
                <img 
                  src={entry.image} 
                  alt={entry.imageAlt || `${entry.title} visual`}
                  className="w-32 h-32 object-contain rounded-lg mx-auto border-2 border-cosmic-accent/20 
                           hover:border-cosmic-accent/50 transition-all duration-300 bg-cosmic-darker/80 p-2"
                />
              </div>
            )}
            
            <p className="text-cosmic-light/80 font-bitter">{entry.description}</p>
            
            {entry.skills && (
              <div className={`mt-4 flex flex-wrap gap-2 ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              }`}>
                {entry.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="text-sm px-3 py-1 rounded-full bg-cosmic-accent/10 
                             text-cosmic-light/70 border border-cosmic-accent/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </DialogTrigger>
        
        <DialogContent className="bg-cosmic-darker/95 border-cosmic-accent/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-cinzel text-cosmic-light">
              {entry.title}
              {entry.role && (
                <span className="block text-lg text-cosmic-light/70 mt-2">{entry.role}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {entry.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={entry.image} 
                  alt={entry.imageAlt || `${entry.title} visual`}
                  className="w-full h-full object-contain bg-cosmic-darker/80 p-4"
                />
              </div>
            )}
            <p className="text-cosmic-light/80">{entry.description}</p>
            {entry.gallery && (
              <a
                href={entry.gallery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cosmic-accent hover:text-cosmic-purple transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Project Gallery
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <TimelineNode index={index} year={entry.year} />
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};