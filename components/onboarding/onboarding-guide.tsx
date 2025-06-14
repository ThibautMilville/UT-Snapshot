'use client';

import React from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

const OnboardingGuide = () => {
  const steps = [
    {
      target: 'body',
      content: 'Welcome to Ultra-Times Snapshot! Let\'s explore the interface.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.navbar',
      content: 'Your profile and UOS balance are displayed here.',
      placement: 'bottom',
    },
    // Add more steps as needed
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Handle tour completion
    }
  }

  return (
    <Joyride
      steps={steps}
      continuous
      showSkipButton
      showProgress
      styles={{
        options: {
          primaryColor: '#AC46E7',
          backgroundColor: '#1A1A2E',
          textColor: '#fff',
          arrowColor: '#1A1A2E',
        },
      }}
      callback={handleJoyrideCallback}
    />
  )
}

export default OnboardingGuide 