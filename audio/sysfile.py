import os

# os.chdir('G:/findanother/audio')
""" 
a=[]

for f in os.listdir():
    a.append(f)
for i in a:
    os.rename(os.path.join(path, filename), os.path.join(path, filename.replace(' ', '-')))

 """
path  = os.getcwd()
filenames = os.listdir(path)
for filename in filenames:
    os.rename(os.path.join(path, filename), os.path.join(path, filename.replace(' ', 'a')))
