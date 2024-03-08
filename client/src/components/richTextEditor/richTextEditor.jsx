import "./styles.css"
export default function RichTextEditor(props) {
  const editorTools = [
    {
      type: "H1",
      action: () => { createBlock("h1") }
    },
    {
      type: "H2",
      action: () => { createBlock("h2") }
    },
    {
      type: "P",
      action: () => { createBlock("p") }
    }
  ]

  function createBlock(type) {
    const element = document.createElement(type)
    const absTools = document.getElementById("abs-Tools")


    element.classList.add('ri-Blocks')
    element.contentEditable = true
    element.innerText = type
    document.getElementById("ri-Editor").append(element)


    let x = element.offsetLeft
    let y = element.offsetTop
    let elementHeight = element.clientHeight
    let offset = 8
    absTools.style.top = `${y + elementHeight + offset}px`
    absTools.style.right = `${x}px`

    element.addEventListener('click', (e) => {

      let x = e.target.offsetLeft
      let y = e.target.offsetTop
      let elementHeight = e.target.clientHeight
      let offset = 8

      console.log(x, y, e);

      absTools.style.top = `${y + elementHeight + offset}px`
      absTools.style.right = `${x}px`
    })
  }
  function saveLesson(){

      let documentData = []
      const Body = document.getElementById('ri-Editor').children
      console.log(Body);

      for (let i = 1; i < Body.length; i++) {
        const element = Body[i];
        let tags = {
          type: element.localName,
          content: element.innerText
        }
        
        documentData.push(tags)
      }

      console.log(documentData);
  }

  return (
    <>
      
    </>

  )
}