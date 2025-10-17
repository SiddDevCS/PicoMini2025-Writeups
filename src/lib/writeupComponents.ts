import FlagInFame from '@/components/writeups/FlagInFame'
import CrackTheGate1 from '@/components/writeups/CrackTheGate1'
import CrackTheGate2 from '@/components/writeups/CrackTheGate2'
import CrackThePower from '@/components/writeups/CrackThePower'
import CorruptedFile from '@/components/writeups/CorruptedFile'
import HiddenInPlainsight from '@/components/writeups/HiddenInPlainsight'
import InputInjection1 from '@/components/writeups/InputInjection1'
import InputInjection2 from '@/components/writeups/InputInjection2'
import LogHunt from '@/components/writeups/LogHunt'
import M1n10n53cr37 from '@/components/writeups/M1n10n53cr37'
import PicoBank from '@/components/writeups/PicoBank'
import RiddleRegistry from '@/components/writeups/RiddleRegistry'
import Byp4ss3d from '@/components/writeups/Byp4ss3d'

export interface WriteupComponent {
  component: React.ComponentType
  title: string
  category: string
  description: string
}

export const writeupComponents: Record<string, WriteupComponent> = {
  'Flag in Fame': {
    component: FlagInFame,
    title: 'Flag in Fame',
    category: 'Forensics',
    description: 'The SOC team discovered a suspiciously large log file after a recent breach. When they opened it, they found an enormous block of encoded text instead of typical logs.'
  },
  'Crack the Gate 1': {
    component: CrackTheGate1,
    title: 'Crack the Gate 1',
    category: 'Web Exploitation',
    description: 'We\'re in the middle of an investigation. One of our persons of interest, ctf player, is believed to be hiding sensitive data inside a restricted web portal.'
  },
  'Crack the Gate 2': {
    component: CrackTheGate2,
    title: 'Crack the Gate 2',
    category: 'Web Exploitation',
    description: 'The login system has been upgraded with a basic rate-limiting mechanism that locks out repeated failed attempts from the same source. We\'ve received a tip that the system might still trust user-controlled headers.'
  },
  'Crack the Power': {
    component: CrackThePower,
    title: 'Crack the Power',
    category: 'Cryptography',
    description: 'We received an encrypted message. The modulus is built from primes large enough that factoring them isn\'t an option, at least not today. See if you can make sense of the numbers and reveal the flag.'
  },
  'Corrupted file': {
    component: CorruptedFile,
    title: 'Corrupted file',
    category: 'Forensics',
    description: 'This file seems broken... or is it? Maybe a couple of bytes could make all the difference. Can you figure out how to bring it back to life?'
  },
  'Hidden in plainsight': {
    component: HiddenInPlainsight,
    title: 'Hidden in plainsight',
    category: 'Forensics',
    description: 'You\'re given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. Your task is to discover the hidden payload and extract the flag.'
  },
  'Input Injection 1': {
    component: InputInjection1,
    title: 'Input Injection 1',
    category: 'Binary Exploitation',
    description: 'A friendly program wants to greet you… but its goodbye might say more than it should. Can you convince it to reveal the flag?'
  },
  'Input Injection 2': {
    component: InputInjection2,
    title: 'Input Injection 2',
    category: 'Binary Exploitation',
    description: 'This program greets you and then runs a command. But can you take control of what command it executes?'
  },
  'Log Hunt': {
    component: LogHunt,
    title: 'Log Hunt',
    category: 'General Skills',
    description: 'Our server seems to be leaking pieces of a secret flag in its logs. The parts are scattered and sometimes repeated. Can you reconstruct the original flag?'
  },
  'M1n10n\'5_53cr37': {
    component: M1n10n53cr37,
    title: 'M1n10n\'5_53cr37',
    category: 'Reverse Engineering',
    description: 'Get ready for a mischievous adventure with your favorite Minions! They\'ve been up to their old tricks, and this time, they\'ve hidden the flag in a devious way within the Android source code.'
  },
  'Pico Bank': {
    component: PicoBank,
    title: 'Pico Bank',
    category: 'Reverse Engineering',
    description: 'In a bustling city where innovation meets finance, Pico Bank has emerged as a beacon of cutting-edge security. Promising state-of-the-art protection for your assets, the bank claims its mobile application is impervious to all forms of cyber threats.'
  },
  'Riddle Registry': {
    component: RiddleRegistry,
    title: 'Riddle Registry',
    category: 'Forensics',
    description: 'Hi, intrepid investigator! You\'ve stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. But beware! Not everything is as it appears.'
  },
  'byp4ss3d': {
    component: Byp4ss3d,
    title: 'byp4ss3d',
    category: 'Web Exploitation',
    description: 'A university\'s online registration portal asks students to upload their ID cards for verification. The developer put some filters in place to ensure only image files are uploaded but are they enough?'
  }
}

export function getWriteupComponent(slug: string): WriteupComponent | null {
  const decodedSlug = decodeURIComponent(slug)
  return writeupComponents[decodedSlug] || null
}

export function getAllWriteupSlugs(): string[] {
  return Object.keys(writeupComponents)
}

export function getWriteupsByCategory() {
  const writeups = Object.entries(writeupComponents).map(([slug, data]) => ({
    slug,
    ...data
  }))
  
  const categories = writeups.reduce((acc, writeup) => {
    if (!acc[writeup.category]) {
      acc[writeup.category] = []
    }
    acc[writeup.category].push(writeup)
    return acc
  }, {} as Record<string, typeof writeups>)
  
  return categories
}
