const task = {
  'engineer': ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  'designer': ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  'funder': ['週末加班', '要能賺錢', '想個 business model', '找 VC 募錢']
}
const phrase = ['很簡單', '很容易', '很快', '很正常']

function generateRubbish(target) {
  const task_collection = task[target]

  const task_choice = task_collection[Math.floor(Math.random() * task_collection.length)]
  const phrase_choice = phrase[Math.floor(Math.random() * phrase.length)]

  let target_c = ''
  if (target === 'engineer') {
    target_c = '工程師'
  } else if (target === 'designer') {
    target_c = '設計師'
  } else if (target === 'funder') {
    target_c = '創業家'
  }

  const rubbish = '身為一個' + target_c + '，' + task_choice + '，' + phrase_choice + '吧!'
  return rubbish
}

generateRubbish('engineer')

module.exports = generateRubbish