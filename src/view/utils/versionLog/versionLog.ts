function REACT_CONSOLE(target: string, value: string) {
  console.log(
    `%c ${target} %c ${value} `,
    'background:#282c34; padding: 1px; border-radius: 4px 0 0 4px;  color: #fff; font-size: 10px;',
    'background:#61dafb; padding: 1px; border-radius: 0 4px 4px 0;  color: #fff; font-size: 10px;'
  )
}

export default REACT_CONSOLE
