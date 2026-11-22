<img src="assets/uconf-title.png" width="500">

available at [underconfig.me](https://underconfig.me)!
<h1 class="question">underconfig!</h1>
lightweight and fast tf2 config generator utilising just autoexec.



it's kind of like [mastercomfig](https://github.com/mastercomfig/mastercomfig), but with a simpler philosophy.

features:
- no .vpk files
- no need to add anything to tf/custom
- no aliases for source convars that already exist
- meaning it is super easy to manually edit
- you can also clone this repo and use it completely offline as it is reliant on pure vanilla js and therefore fully portable

<h1>faq</h1>
<p>(more on https://blog.underconfig.me/faq)</p><br>
<p><strong>is this safe to use?</strong></p>
<p>yes. it is 100% safe to use.</p>
<p>no, it will not get you VAC banned, explode your computer or give your dog lung cancer.</p>
<p>no one has ever been VAC banned or gotten a virus from using console variables in a source game.</p>
<p> convars, aka console commands, do NOT have the power to change any files in either TF2 or your base system. they also do not have the power to affect server-side functionality, your items or your steam account. they purely concern settings in your current TF2 installation and they can be very easily restored by removing all extra cfg and/or custom files and appending <code>-autoconfig</code> to your TF2 launch arguments. more on resetting settings at the faq page on the site.</p><br>

<p><strong>functionally not very. from a purely technical sense, this is far less advanced than masterconfig due to the limitations of only using convars. but that is also exactly why this exists in the first place. i respect the work behind mastercomfig but i also kept getting really annoyed by how ironically difficult it is to modify later (using VPKEdit to modify multiple .vpk files, figuring out what custom alias corresponds to a convar, addons not working at all for whatever reason etc.) it also later struck me that most things i was using it for can be done by only using convars.

that is the primary reason this project exists.</p>

<p><strong>how do i use it?</strong></p>

<p>click the "autoexec.cfg" button and download the .cfg file, then put it into your cfg directory before launching TF2.</p>
            
<p>on windows, your cfg folder is typically located in
<code>C:\Program Files (x86)\Steam\steamapps\common\Team Fortress 2\tf\cfg</code></p>
<p>on linux (non-flatpak), your cfg folder is typically located in
<code>/home/yourusername/.local/share/Steam/steamapps/common/Team Fortress 2/tf/cfg</code></p>
