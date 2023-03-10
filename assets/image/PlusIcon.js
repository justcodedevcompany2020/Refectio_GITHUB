import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlusIconComponent(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 17V9m0 0V1m0 8h8M9 9H1"
        stroke="#888"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default PlusIconComponent