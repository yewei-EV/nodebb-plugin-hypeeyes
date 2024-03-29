import * as fs from 'fs';
import * as path from 'path';
import { Post } from '../entities/post/post';
import { Topic } from '../entities/topic/topic';
import { User } from '../entities/user/user';


interface RecursiveMap extends WordMap {}
type WordMap = Map<string, RecursiveMap>;

export class WordFilter {
  private sensitiveWordsMap: WordMap;
  private regExp = new RegExp(/[^\S]/);
  private regUrlExp = new RegExp(/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/);
  private static wordFilter = null;

  private static getWordFilter() {
    if (this.wordFilter) return this.wordFilter;
    this.wordFilter = new WordFilter();
    this.wordFilter.initMap();
    return this.wordFilter;
  }

  parse(data: { post: Post }, callback) {
    if (!data || !data.post || !data.post.content) {
      return callback(null, data);
    }
    data.post.content = WordFilter.getWordFilter().parseSensitiveWord(data.post.content);
    callback(null, data);
  }

  /*
  parseRaw(content: string, callback: Function) {
    if (!content) {
      return callback(null, content);
    }
    content = WordFilter.getWordFilter().parseSensitiveWord(content);
    callback(null, content);
  }
   */

  parseSignature(data: { userData: User }, callback: Function) {
    if (!data || !data.userData || !data.userData.signature) {
      return callback(null, data);
    }
    data.userData.signature = WordFilter.getWordFilter().parseSensitiveWord(data.userData.signature);
    callback(null, data);
  }

  parseTopic(data: { topic: Topic }, callback: Function) {
    data.topic.title = WordFilter.getWordFilter().parseSensitiveWord(data.topic.title);
    data.topic.slug = WordFilter.getWordFilter().parseSensitiveWord(data.topic.slug);
    data.topic.titleRaw = WordFilter.getWordFilter().parseSensitiveWord(data.topic.titleRaw);

    callback(null, data);
  }

  filterTags(data: { tags: string[] }, callback: Function) {
    let tags = [];
    for (let tag of data.tags) {
      tags.push(WordFilter.getWordFilter().parseSensitiveWord(tag));
    }
    data.tags = tags;
    callback(null, data);
  }

  getTeaser(data: { teaser }, callback: Function) {
    data.teaser.content = WordFilter.getWordFilter().parseSensitiveWord(data.teaser.content);
    callback(null, data);
  }

  private makeSensitiveMap(sensitiveWordList: string[]) {
    // 构造根节点

    const result = new Map();
    for (const word of sensitiveWordList) {
      let map = result;
      for (let i = 0; i < word.length; i++) {
        // 依次获取字
        const char = word.charAt(i);
        // 判断是否存在
        if (map.get(char)) {
          // 获取下一层节点
          map = map.get(char);
        } else {
          const item = new Map();
          map.set(char, item);
          map = map.get(char);
        }
      }
      map.set('finish', map);
    }
    this.sensitiveWordsMap = result;
  }

  public initMap() {
    const data = fs.readFileSync(path.resolve(__dirname, '../../src/sensitive-words/sensitiveWords.txt'), 'utf8');
    const wordsArray = data.trim().split('|');
    this.makeSensitiveMap(wordsArray);
  }

  private isIgnoreWord(word: string) {
    return word.match(this.regExp);
  }

  private isUrlWord(word: string) {
    return word.match(this.regUrlExp);
  }

  parseSensitiveWord(txt: string): string {
    if (!txt) {
      return txt;
    }
    const words = [];
    let startIndex = 0;
    let matchStartIndex = 0;
    for (let i = 0; i < txt.length; i++) {
      let currentMap: WordMap = this.sensitiveWordsMap;
      let newWord = '';
      for (let j = i; j < txt.length; j++) {
        const word = txt.charAt(j);

        // url
        if (word === 'h' || word === 'H') {
          const next = txt.charAt(j + 1);
          if (('t' === next || 'T' === next) && (txt.substr(j, 7).toLowerCase() === 'http://' ||
            txt.substr(j, 7).toLowerCase() === 'https:/' )) {
            const start = j;
            j += 7;
            while (this.isUrlWord(txt.charAt(j)) && j < txt.length) {
              j++;
            }
            newWord += txt.slice(start, j);
            j--;
            i = j;
            break;
          }
        }

        // img or link
        if (word === '(') {
            if (txt.charAt(j - 1) === ']') {
              let index = j - 2;
              while (txt.charAt(index) !== '[' && index > 0 && j - index < 1000) {
                index --;
              }
              if (index > 0 && j - index < 1000) {
                index = j + 1;
                while (txt.charAt(index) !== ')' && index < txt.length && index - j < 1000) {
                  index ++;
                }
                if (index < txt.length && index - j < 1000) {
                  words.push(txt.substr(startIndex, index - startIndex + 1));
                  j = index + 1;
                  i = j;
                  startIndex = j;
                  break;
                }
              }
            }
        }

        if (this.isIgnoreWord(word)) {
          if (newWord !== '') {
            newWord += word;
          }
          continue;
        }
        currentMap = currentMap.get(word);
        if (currentMap) {
          if (newWord.endsWith('*')) {
            newWord += '$';
          } else {
            newWord += '*';
          }
          if (currentMap.get('finish')) {
            words.push(txt.substr(startIndex, matchStartIndex - startIndex - 1));
            words.push(newWord);
            i = j;
            startIndex = j + 1;
            matchStartIndex = j + 1;
            break;
          }
        } else {
          matchStartIndex = j + 1;
          break;
        }
      }
    }
    words.push(txt.substr(startIndex, txt.length - startIndex));
    return words.join('');
  }
}
