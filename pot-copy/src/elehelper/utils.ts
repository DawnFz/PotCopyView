
export const judgeServer = (server: number) => {
    switch (server) {
        case 0 :
            return '官服';
        case 1 :
            return '哔哩';
        case 2 :
            return '国际';
    }
}

export const judgeServerStyle = (server: number) => {
    switch (server) {
        case 0 :
            return 'background-color: #F3B570FF';
        case 1 :
            return 'background-color: #FFA5B6FF';
        case 2 :
            return 'background-color: rgb(150, 150, 150);';
    }
}


export const judgeUploadType = (server: number) => {
    switch (server) {
        case 0 :
            return '原创作品';
        case 1 :
            return '转载作品';
        case 2 :
            return '二改作品';
    }
}

export const judgeTypeStyle = (server: number) => {
    switch (server) {
        case 0 :
            return 'background-color: #EE82EE';
        case 1 :
            return 'background-color: #778899';
        case 2 :
            return 'background-color: #DC8F8F;';
    }
}

