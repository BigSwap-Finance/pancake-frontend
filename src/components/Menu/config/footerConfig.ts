import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://contact@bigswap.xyz',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/bigswap-finance',
      },
      {
        label: t('Community'),
        href: 'https://t.me/BigSwapArmy',
      },
      {
        label: t('BGSP token'),
        href: 'https://bigswap.xyz/what-is-bigswap/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store Coming Soon'),
        href: '',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://t.me/BigSwapSupport',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.bigswap.exchange/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.bigswap.exchange//get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/bigswap-finance',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.bigswap.exchange/',
      },
    ],
  },
]
