import React, { SVGProps } from 'react'

const Messenger = (props: SVGProps<SVGSVGElement>) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
      <defs />
      <defs>
        <radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%">
          <stop offset="0%" stopColor="#09F" />
          <stop offset="60.975%" stopColor="#A033FF" />
          <stop offset="93.482%" stopColor="#FF5280" />
          <stop offset="100%" stopColor="#FF7061" />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" fillOpacity="0" d="M0 0h1024v1024H0z" />
        <path
          fill="url(#a)"
          d="M512 122c-225.332 0-400 165.056-400 388 0 116.614 47.792 217.382 125.622 286.984 6.534 5.848 10.478 14.04 10.746 22.808l2.178 71.152c.696 22.696 24.14 37.464 44.908 28.296l79.394-35.048a31.93 31.93 0 0121.364-1.568C432.696 892.656 471.526 898 512 898c225.332 0 400-165.056 400-388S737.332 122 512 122z"
        />
        <path
          fill="#FFF"
          d="M271.802 623.469l117.5-186.416c18.69-29.656 58.714-37.04 86.758-16.008l93.454 70.09a23.998 23.998 0 0028.91-.082l126.214-95.788c16.846-12.784 38.836 7.376 27.562 25.266L634.7 606.95c-18.692 29.654-58.716 37.04-86.758 16.006l-93.456-70.092a24 24 0 00-28.91.084l-126.214 95.788c-16.846 12.783-38.836-7.377-27.56-25.266z"
        />
      </g>
    </svg>
  )
}

export default Messenger
