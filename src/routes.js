
/** @typedef {import('pinecone-router/dist/types').Handler} Handler */

/**
 * The routes of your application
 * 
 * @type {{ [key: string]: Handler|{handlers?: Handler[], view?: string[]|null}|string }}
 */
export default {
    '/': '/views/home.html',
    '/about': '/views/about.html',
    notfound(context) {
        return context.redirect('/');
    }
};