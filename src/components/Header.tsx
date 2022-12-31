import React from "react";

const Header = () => {
  return (
    <div className={classes.top}>
      <div className={classes.links}>
        <h1> ChatME</h1>
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Search for users"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={handleKey}
          />

          <CiSearch className={classes.seIcons} />
        </div>
        <div>
          <Link href="/chat">CHAT</Link>
          <Link href="/contacts">CONTACTS</Link>
          <Link href="/setting">SETTINGS</Link>
          <Link href="/faq">FAQS</Link>
        </div>
      </div>

      {authContext?.photoURL ? (
        <img
          className={classes.img}
          referrerPolicy="no-referrer"
          src={authContext?.photoURL}
          alt=""
        />
      ) : (
        <div className="avatar">
          <RxAvatar />
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
