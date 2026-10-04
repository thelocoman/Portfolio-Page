'use client';

import { useState, useRef } from 'react';
import { CONTACT_ACTIONS } from '@/constants/contactActions';
import { ContactAction, WheelDimensions } from '@/types/contact.types';
import { useRippleEffect } from '@/hooks/useRippleEffect';
import { RippleBackground } from './rippleBackground';
import { ActionWheel } from './actionWheel';
import { CentralHub } from './centralHub';

const WHEEL_DIMENSIONS: WheelDimensions = {
  wheelSize: 510,
  centerRadius: 150,
  outerRadius: 260,
};

/* Contact & Social Media Section. Single Responsibility: Assembles interactive wheel, central hub, and background canvas ripple effect. */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [chosenItem, setChosenItem] = useState<ContactAction>(CONTACT_ACTIONS[0]);
  const { ripples, addRipple, removeRipple } = useRippleEffect();

  const handleSelectAction = (item: ContactAction) => {
    setChosenItem(item);
    addRipple(item.gradientStops);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#1e40af] to-[#45daea] flex flex-col justify-center items-center py-20 px-6 min-h-screen"
    >
      <RippleBackground ripples={ripples} onRippleEnd={removeRipple} />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Social Media and Contact
        </h2>
        <p className="text-gray-900 font-medium max-w-xl text-center text-lg mb-10">
          I'm open to meeting new people and to new opportunities. Here are the
          channels through which you can connect with me or watch my content.
          Feel free to connect, and enjoy the new posts!
        </p>

        <div className="relative flex items-center justify-center">
          <ActionWheel
            actions={CONTACT_ACTIONS}
            chosenItem={chosenItem}
            dimensions={WHEEL_DIMENSIONS}
            onSelectAction={handleSelectAction}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <CentralHub action={chosenItem} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}