# apartir da paz raiz
find . -name *.test.js -not -path '*node_modules**'

find . -name *.js -not -path '*node_modules**'

# painel interativo para selecionar
npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt


# 1s -> primeira linha
# ^  -> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito

CONTENT="'use strict;'"
find . -name *.js -not -path '*node_modules**' \
  | ipt -o
  | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
