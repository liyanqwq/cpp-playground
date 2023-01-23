/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const LAYOUT_CONFIG_KEY = 'layoutConfig';

const initialProgram =
  `#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <vector>
#include <queue>
#include <bitset>
#include <unordered_map>
using namespace std;

template <typename T = int>
inline T read()
{
    T x = 0, w = 1;
    char ch = 0;
    while (ch < '0' || ch > '9')
    {
        if (ch == '-')
            w = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9')
    {
        x = (x << 3) + (x << 1) + (ch - '0');
        ch = getchar();
    }
    return x * w;
}
template <typename T = int>
inline void write(T x)
{
    if (x < 0)
        x = -x, putchar('-');
    if (!x)
    {
        putchar('0');
        return;
    }
    static int sta[64];
    int tp = 0;
    while (x)
    {
        sta[tp++] = x % 10, x /= 10;
    }
    while (tp)
    {
        putchar(sta[--tp] + '0');
    }
}
const int N = 5e5 + 5;

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);

    printf("Hello World!");

    return 0;
}
`;

// Golden Layout
let layout = null;

function initLayout() {
  const defaultLayoutConfig = {
    settings: {
      showCloseIcon: false,
      showPopoutIcon: false,
    },
    content: [{
      type: 'row',
      content: [{
        type: 'component',
        componentName: 'editor',
        componentState: { fontSize: 18, value: initialProgram },
        isClosable: false,
      }, {
        type: 'stack',
        content: [{
          type: 'component',
          componentName: 'terminal',
          componentState: { fontSize: 18 },
          isClosable: false,
        }]
      }]
    }]
  };

  layout = new Layout({
    configKey: LAYOUT_CONFIG_KEY,
    defaultLayoutConfig,
  });

  layout.on('initialised', event => {
    // Editor stuff
    editor.commands.addCommand({
      name: 'run',
      bindKey: { win: 'Ctrl+Enter', mac: 'Command+Enter' },
      exec: run
    });
  });
  layout.init();
}

function resetLayout() {
  localStorage.removeItem('layoutConfig');
  if (layout) {
    layout.destroy();
    layout = null;
  }
  initLayout();
}

// Toolbar stuff
$('#reset').on('click', event => { if (confirm('really reset?')) resetLayout() });
$('#run').on('click', event => run(editor));


initLayout();
