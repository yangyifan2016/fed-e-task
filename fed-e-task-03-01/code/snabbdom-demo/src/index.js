import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { datasetModule } from 'snabbdom/build/package/modules/dataset'

const patch = init([eventListenersModule, datasetModule])
const data = [
    {
        rank: 1,
        name: 'first',
        desc: 'gXXXX'
    },{
        rank: 2,
        name: 'second',
        desc: 'eXXXX'
    },{
        rank: 3,
        name: 'third',
        desc: 'aXXXX'
    },{
        rank: 4,
        name: 'forth',
        desc: 'vXXXX'
    },{
        rank: 5,
        name: 'fifth',
        desc: 'yXXXX'
    }
]
let title = h('h1', 'Top 10 movies')
let rankButton = h('a.padding-right.pointer', {
    on: {
        click: function() {
            data.sort(function(a, b) {
                if (data.length > 1 && data[0].rank > data[1].rank) {
                    return a.rank - b.rank
                } else {
                    return b.rank - a.rank
                }
            })
            oldVnode = patch(oldVnode, view(data))
        }
    }
}, 'Rank')
let titleButton = h('a.padding-right.pointer', {
    on: {
        click: function() {
            data.sort(function(a, b) {
                return a.name.localeCompare(b.name)
            })
            oldVnode = patch(oldVnode, view(data))
        }
    }
}, 'Title')
let descButton = h('a.padding-right.pointer', {
    on: {
        click: function() {
            data.sort(function(a, b) {
                return a.desc.localeCompare(b.desc)
            })
            oldVnode = patch(oldVnode, view(data))
        }
    }
}, 'Desc')
let sortLabel = h('span.padding-right', 'Sort by:')
let sortsContainer = h('div.inline-block', [rankButton, titleButton, descButton])

let addButton = h('a.pointer.fr', {
    on: {
        click: function() {
            let rank = 0;
            data.forEach(d => {
                if (d.rank > rank) {
                    rank = d.rank
                }
            })
            data.unshift({
                rank: rank + 1,
                name: 'new one',
                desc: 'This one is added by button'
            })
            oldVnode = patch(oldVnode, view(data));
        }
    }
}, 'Add')

let buttonsContainer = h('div', [sortLabel, sortsContainer, addButton])

let vnode = view(data)
let app = document.querySelector('#app')
let oldVnode = null;
oldVnode = patch(app, vnode)



function view(data) {
    let lis = [];
    data.forEach(movie => {
        lis.push(h('li.movie', [
            h('span', movie.rank),
            h('span', movie.name),
            h('span', movie.desc),
            h( 'a.pointer', {
                dataset: {
                    rank: movie.rank
                },
                on: {
                    click: function(e) {
                        for (let i = 0; i < data.length; i++) {
                            if ( e.target.dataset.rank == data[i].rank) {
                                data.splice(i, 1);
                                break
                            }
                        }
                        oldVnode = patch(oldVnode, view(data))
                    }
                }
            }, '×')
        ]))
    })
    let ul = h('ul', lis);
    return h('div.container', [title, buttonsContainer, ul])
}