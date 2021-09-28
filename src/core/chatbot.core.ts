import { Message } from '../interface/message.interface';
import { WordGroup } from '../interface/word-group.interface';
import wordBank from './word-bank.json';

class ChatEngine {

    constructor() { }

    identifyHuman(payload: Message) {
        if (payload.origin === 'user') {
            return true;
        } else {
            return false;
        }
    }

    async processChat(message: string) {
        const wordGroup = this.getWordGroup(message);
        let answer = '';

        if (!wordGroup.needReplacement) {
            answer = wordGroup.answer;
        }

        if (wordGroup.needReplacement) {
            switch (wordGroup.category) {
                case 'day':
                    answer = wordGroup.answer.replace('{{replacement}}', this.getDay().toString());
                    break;
                case 'date':
                    answer = wordGroup.answer.replace('{{replacement}}', this.getDate().toString());
                    break;
                case 'time':
                    answer = wordGroup.answer.replace('{{replacement}}', this.getTime().toString());
                    break;
                case 'weather':
                    answer = wordGroup.answer.replace('{{replacement}}', await this.getWeather());
                    break;
                default:
                    break;
            }
        }
        return answer;
    }

    async getWeather() {
        let weather = '';
        const promise = await new Promise((resolve, reject) => {
            fetch('http://api.weatherapi.com/v1/current.json?key=041ee0ad2c114786a22174935212709&q=Jakarta&aqi=no').then((response) => {
                response.json().then((data) => {
                    resolve(data);
                });
            });
        }).then((data: any) => {
            weather = data.current.condition.text
        });
        return weather;
    }

    getDate() {
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${hour}:${minute}:${second}`;
    }

    getDay() {
        const date = new Date();
        const day = date.getDay();
        switch (day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                break;
        }
        return day;
    }

    getWordGroup(message: string): WordGroup {
        for (let index = 0; index < wordBank.groups.length; index++) {
            const element = wordBank.groups[index];
            for (let index2 = 0; index2 < element.keyword.length; index2++) {
                const element2 = element.keyword[index2];
                if (message.includes(element2)) {
                    return element;
                }
            }
        }
        const lastIndex = wordBank.groups.length - 1;
        return wordBank.groups[lastIndex]
    }
}

export { ChatEngine }